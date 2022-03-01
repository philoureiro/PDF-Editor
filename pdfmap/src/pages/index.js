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

export default function Home() {
  const [elements, setElements] = useState([]);
  const [urlPdf, setUrlPdf] = useState('');
  const [scale, setScale] = useState(1);
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });
  const [pagesHandler, setPagesHandler] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const handleAddElement = element => {
    const newElement = { ...element, x: 0, y: 0, id: uuidv4() };
    setElements(prevElements => [...prevElements, newElement]);
  };

  return (
    <main style={STYLE_MAIN}>
      <SideMenu
        onAddElement={handleAddElement}
        document={urlPdf}
        setDocument={setUrlPdf}
        scale={scale}
        setScale={setScale}
        pagesHandler={pagesHandler}
        setPagesHandler={setPagesHandler}
      />
      <DocumentContainer
        document={urlPdf}
        scale={scale}
        setDocumentSize={setMapContainerConfig}
        pagesHandler={pagesHandler}
        setPagesHandler={setPagesHandler}
      />
      <MapContainer
        config={mapContainerConfig}
        items={elements}
        setItems={setElements}
      />
    </main>
  );
}
