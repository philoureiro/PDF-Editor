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

const ForwardRefDocumentContainer = forwardRef((props, ref) => (
  <DocumentContainer {...props} documentRef={ref} />
));

const STYLE_MAIN = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
  margin: '1rem 0',
};

const INITAL_STATE_ELEMENT = {
  x: 0,
  y: 0,
  id: uuidv4(),
};

export default function Home() {
  const documentRef = useRef(null);

  const [elements, setElements] = useState([]);
  const [urlPdf, setUrlPdf] = useState('');
  const [scale, setScale] = useState(1);
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });

  const handleAddElement = element => {
    const newElement = { ...element, ...INITAL_STATE_ELEMENT };
    setElements(prevElements => [...prevElements, newElement]);
  };

  return (
    <main style={STYLE_MAIN}>
      <SideMenu onAddElement={handleAddElement} setDocument={setUrlPdf} />
      <MapContainer config={mapContainerConfig} items={elements} />
      <ForwardRefDocumentContainer
        document={urlPdf}
        scale={scale}
        setDocumentSize={setMapContainerConfig}
        ref={documentRef}
      />
    </main>
  );
}
