import { useRef, useEffect } from 'react';
import { Rect, Transformer } from 'react-konva';

const MINIMAL_TRANSFORM_SIZE = 5;

export default function Element({
  elementProps,
  isSelected,
  onSelect,
  onChange,
}) {
  const { zoom, ...props } = elementProps;
  const rectangleRef = useRef();
  const transformRef = useRef();

  const changeElement = changes => onChange({ ...props, ...changes });

  const handleTransform = (oldBox, newBox) => {
    if (
      newBox.width < MINIMAL_TRANSFORM_SIZE ||
      newBox.height < MINIMAL_TRANSFORM_SIZE
    )
      return oldBox;

    return newBox;
  };

  const handleDragEnd = event => {
    changeElement({
      x: event.target.x(),
      y: event.target.y(),
      width: event.target.attrs.width,
      height: event.target.attrs.height,
    });
  };

  const handleTransformEnd = () => {
    const node = rectangleRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    changeElement({
      x: node.x(),
      y: node.y(),
      width: Math.max(MINIMAL_TRANSFORM_SIZE, node.width() * scaleX),
      height: Math.max(MINIMAL_TRANSFORM_SIZE, node.height() * scaleY),
    });
  };

  useEffect(() => {
    if (isSelected) {
      transformRef.current.nodes([rectangleRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        ref={rectangleRef}
        {...props}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected ? (
        <Transformer ref={transformRef} boundBoxFunc={handleTransform} />
      ) : null}
    </>
  );
}
