import { useState, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.css';

import SideMenu from '../components/sideMenu';

const DocumentContainer = dynamic(
  () => import('../components/documentContainer'),
  { ssr: false }
);
const MapContainer = dynamic(() => import('../components/mapContainer'), {
  ssr: false,
});

const STYLE_MAIN = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
};

const INITAL_STATE_ELEMENT = {
  x: 100,
  y: 100,
};

export default function Home() {
  const [elements, setElements] = useState([
    {
      ...INITAL_STATE_ELEMENT,
      id: uuidv4(),
      width: 100,
      height: 100,
      fill: '#000',
    },
  ]);
  const [urlPdf, setUrlPdf] = useState('');
  const [scale, setScale] = useState(1);
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });

  const handleAddElement = element => {
    const newElement = { ...element, ...INITAL_STATE_ELEMENT, id: uuidv4() };
    setElements(prevElements => [...prevElements, newElement]);
  };

  console.log('elements = ', elements);

  return (
    <main style={STYLE_MAIN}>
      <SideMenu onAddElement={handleAddElement} setDocument={setUrlPdf} />
      <DocumentContainer
        document={urlPdf}
        scale={scale}
        setDocumentSize={setMapContainerConfig}
      />
      <MapContainer config={mapContainerConfig} items={elements} />
    </main>
  );
}
