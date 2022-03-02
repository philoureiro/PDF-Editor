import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";

import Element from "../element";

const CONTAINER_STYLE = {
  position: "absolute",
  top: 0,
  border: "1px solid #f00",
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
    <Stage
      width={config.width}
      height={config.height}
      onClick={checkDeselect}
      style={CONTAINER_STYLE}
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
  );
}

MapContainer.propTypes = {
  config: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
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
