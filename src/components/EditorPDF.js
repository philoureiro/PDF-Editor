import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [sqr1, setSqr1] = useState();
  const [sqr2, setSqr2] = useState();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();

      const node = shapeRef.current;

      console.log("atual => ", shapeProps);
    }
  }, [isSelected, shapeProps]);

  const setSQRProps = () => {
    console.log(shapeProps);
    if (shapeProps.id === "rect1") {
      setSqr1(shapeProps);
    }
    if (shapeProps.id === "rect2") {
      setSqr2(shapeProps);
    }
  };

  return (
    <React.Fragment>
      <Rect
        onClick={() => setSQRProps()}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        // onMouseMove={}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          shapeProps.id === "rect1"
            ? (initialRectangles[0].x = e.target.x())
            : (initialRectangles[1].x = e.target.x());
          shapeProps.id === "rect2"
            ? (initialRectangles[0].y = e.target.y())
            : (initialRectangles[1].y = e.target.y());
          console.log(initialRectangles);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    opacity: 0.2,
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    opacity: 0.2,
    id: "rect2",
  },
];

console.log(initialRectangles);
const PDFEditor = ({ toDrawer, currentDimmensions }) => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  let width, height;
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  if (currentDimmensions) {
    width = currentDimmensions?.width;
    height = currentDimmensions?.height;
  }
  return (
    toDrawer && (
      <React.Fragment>
        <Stage
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{
            backgroundColor: "transparent",
            border: "1px solid yellow",
            display: "flex",
            zIndex: 0,
            position: "absolute",
            maxWidth: currentDimmensions?.width || 0,
            maxHeight: currentDimmensions?.height || 0,
          }}
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </React.Fragment>
    )
  );
};

export default PDFEditor;
