import React, { useState, useEffect, useRef } from "react";
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
  height: "100%",
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
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  position: "absolute",
  top: "3vh",
  right: "2vw",
  width: "190px",
  borderRadius: "5px",
  boxShadow: "0 0.5rem 1rem black",
  alignItems: "center",
  justifyContent: "space-around",
};

const STYLE_PDF_VIEWER = {
  backgroundColor: "#2a2b2c",
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "inherit",
  padding: 25,
  borderRadius: "10px",
  boxShadow: "0 0.5rem 1rem black",
};

const STYLE_SCROLLBAR_CONTAINER = {
  backgroundColor: "transparent",
  display: "block",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  marginTop: "20px",
  padding: 20,
  // overflow: "scroll",
  scrollSnapAlign: "center",
  // width: 650,

  // minHeight: 842 + 10,
  // minWidth: 595 + 10,
  // maxHeight: 842 + 10,
  // maxWidth: 595 + 10,
  // minHeight: 842 + 10,
  // minWidth: 595 + 10,

  position: "relative",
};

export default function Home() {
  const [mutableElements, setMutableElements] = useState([]);
  const [hidehighlighter, setHideHighlighter] = useState(false);
  const [immutableElements, setImmutableElements] = useState([]);
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });
  const [initialDimmensionsByPDF, setInitialDimmensionsByPDF] = useState({
    width: 0,
    height: 0,
  });
  const { scale, url, width, height, setHeight, setWidth } = useDocument();

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

  console.log("VOLTOU", initialDimmensionsByPDF);
  console.log("atual", mapContainerConfig);

  return (
    <main style={STYLE_MAIN}>
      <div style={STYLE_CONTAINER}>
        <SideMenu
          onAddElement={handleAddElement}
          mutableElements={mutableElements}
          setMutableElements={setMutableElements}
          setImmutableElements={setImmutableElements}
        />
        {url && (
          <div
            style={{
              ...STYLE_SCROLLBAR_CONTAINER,
              width: initialDimmensionsByPDF?.width + 100,
              height: initialDimmensionsByPDF?.height + 100,
              overflow: `${
                mapContainerConfig?.width > initialDimmensionsByPDF?.width + 100
                  ? "scroll"
                  : "hidden"
              }`,
            }}
          >
            <div
              style={{
                ...STYLE_PDF_VIEWER,
                width: mapContainerConfig?.width + 50,
                height: mapContainerConfig?.height + 50,
              }}
            >
              <DocumentContainer
                setDocumentSize={setMapContainerConfig}
                setInitialDimmensionsByPDF={setInitialDimmensionsByPDF}
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
        )}
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
