import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Element from "../element";

const CONTAINER_STYLE = {
  position: "absolute",
  border: "3px solid #ff1f1f",
  display: "flex",
  zIndex: 0,
  position: "absolute",
};

function MapContainer({ config, mutableElements, setMutableElements }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const checkDeselect = (event) => {
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) setSelectedItem(null);
  };

  const handleChangeElement = ({ changes, index }) => {
    const elements = mutableElements.slice();
    elements[index] = changes;
    setMutableElements(elements);
  };

  return (
    <div style={CONTAINER_STYLE}>
      <Stage
        width={config.width}
        height={config.height}
        onClick={checkDeselect}
      >
        <Layer>
          {mutableElements.map(({ id, ...elementProps }, index) => (
            <Element
              key={id}
              elementProps={{ ...elementProps, id }}
              isSelected={id === selectedItem}
              onSelect={() => setSelectedItem(id)}
              onChange={(changes) => handleChangeElement({ changes, index })}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

MapContainer.propTypes = {
  config: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    opacity: 0.2,
  }).isRequired,
  mutableElements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ).isRequired,
  setMutableElements: PropTypes.func.isRequired,
};

export default MapContainer;
