import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { v4 as uuidv4 } from 'uuid'
import 'antd/dist/antd.css'

import SideMenu from '../components/sideMenu'
import DocumentContext from '../contexts/document'

const DocumentContainer = dynamic(
  () => import('../components/documentContainer'),
  { ssr: false }
)
const MapContainer = dynamic(() => import('../components/mapContainer'), {
  ssr: false
})

const STYLE_MAIN = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
}

export default function Home () {
  const [elements, setElements] = useState([])
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550
  })

  const handleAddElement = element => {
    const newElement = { ...element, x: 0, y: 0, id: uuidv4() }
    setElements(prevElements => [...prevElements, newElement])
  }

  return (
    <DocumentContext>
    <main style={STYLE_MAIN}>
      <SideMenu
        onAddElement={handleAddElement}
        items={elements}
        setItems={setElements}
      />
      <DocumentContainer setDocumentSize={setMapContainerConfig} />
      <MapContainer
        config={mapContainerConfig}
        items={elements}
        setItems={setElements}
      />
    </main>
    </DocumentContext>
  )
}
