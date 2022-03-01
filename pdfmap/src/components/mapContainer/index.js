import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'

import Element from '../element'

const CONTAINER_STYLE = {
  position: 'absolute',
  top: 0,
  border: '1px solid #f00'
}

function MapContainer ({ config, items, setItems }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const checkDeselect = event => {
    const clickedOnEmpty = event.target === event.target.getStage()
    if (clickedOnEmpty) setSelectedItem(null)
  }

  const handleChangeElement = ({ changes, index }) => {
    const elements = items.slice()
    elements[index] = changes
    setItems(elements)
  }

  return (
    <Stage
      width={config.width}
      height={config.height}
      onClick={checkDeselect}
      style={CONTAINER_STYLE}
    >
      <Layer>
        {items.map(({ id, ...elementProps }, index) => (
          <Element
            key={id}
            elementProps={{ ...elementProps, id }}
            isSelected={id === selectedItem}
            onSelect={() => setSelectedItem(id)}
            onChange={changes => handleChangeElement({ changes, index })}
          />
        ))}
      </Layer>
    </Stage>
  )
}

MapContainer.propTypes = {
  config: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    })
  ).isRequired,
  setItems: PropTypes.func.isRequired
}

export default MapContainer
