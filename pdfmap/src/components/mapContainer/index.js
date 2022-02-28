import { Stage, Layer, Rect } from 'react-konva';

const CONTAINER_STYLE = {
  position: 'absolute',
  top: 0,
  border: '1px solid #f00',
  width: '50vw',
  minWidth: '595px',
};

export default function MapContainer({ config, items }) {
  return (
    <Stage width={config.width} height={config.height} style={CONTAINER_STYLE}>
      <Layer>
        {items.map(item => (
          <Rect
            key={item.id}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            fill={item.fill}
          />
        ))}
      </Layer>
    </Stage>
  );
}
