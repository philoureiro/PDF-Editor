import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import { EyeOutlined, EyeInvisibleTwoTone } from "@ant-design/icons";

import SideMenu from "../components/sideMenu";
import { useDocument } from "../contexts/document";

const DocumentContainer = dynamic(
  () => import("../components/documentContainer"),
  { ssr: false }
);
const MapContainer = dynamic(() => import("../components/mapContainer"), {
  ssr: false,
});

const STYLE_MAIN = {
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundColor: "#ebcea3",
};

const STYLE_CONTAINER = {
  display: "flex",
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
  left: 0,
  flexDirection: "row",
};

const STYLE_BUTTON_CONTAINER = {
  display: "flex",
  backgroundColor: "##1890ff",
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
  top: "3vh",
  right: "2vw",
  width: "190px",
  borderRadius: "5px",
  boxShadow: "1px 0px 0px 1px gray",
  alignItems: "center",
  justifyContent: "space-around",
};

export default function Home() {
  const [mutableElements, setMutableElements] = useState([]);
  const [hidehighlighter, setHideHighlighter] = useState(false);
  const [immutableElements, setImmutableElements] = useState([]);
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });

  const { scale } = useDocument();

  const handleAddElement = (element) => {
    const newElement = { ...element, x: 0, y: 0, id: uuidv4() };
    setImmutableElements((prevElements) => [...prevElements, newElement]);
    setMutableElements((prevElements) => [...prevElements, newElement]);
  };

  const resizeElementsByScale = () => {
    const items = immutableElements.map(
      ({ x, y, width, height, ...restElement }) => ({
        ...restElement,
        x: x * scale,
        y: y * scale,
        width: width * scale,
        height: height * scale,
      })
    );
    setMutableElements(items);
  };

  useEffect(() => {
    resizeElementsByScale();
  }, [scale, immutableElements]);

  return (
    <main style={STYLE_MAIN}>
      <div style={STYLE_CONTAINER}>
        <SideMenu
          onAddElement={handleAddElement}
          mutableElements={mutableElements}
          setMutableElements={setMutableElements}
          setImmutableElements={setImmutableElements}
        />
        <div
          style={{
            backgroundColor: "#2a2b2c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "20px",
            marginTop: "20px",
            padding: 25,
            borderRadius: "10px",
          }}
        >
          <DocumentContainer
            dimmensions={mapContainerConfig}
            setDocumentSize={setMapContainerConfig}
          />
          {!hidehighlighter && (
            <MapContainer
              config={mapContainerConfig}
              mutableElements={mutableElements}
              setMutableElements={setMutableElements}
            />
          )}
        </div>
      </div>

      <Button
        onClick={() => setHideHighlighter(!hidehighlighter)}
        style={STYLE_BUTTON_CONTAINER}
      >
        {`${hidehighlighter ? "Mostrar marcação" : "Ocultar marcação"}`}
        {hidehighlighter ? (
          <EyeOutlined style={{ backgroundColor: "white" }} />
        ) : (
          <EyeInvisibleTwoTone style={{ backgroundColor: "white" }} />
        )}
      </Button>
    </main>
  );
}
