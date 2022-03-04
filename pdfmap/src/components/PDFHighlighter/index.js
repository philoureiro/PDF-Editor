import React, { useState } from "react";
import { useDocument } from "../../contexts/document";
import dynamic from "next/dynamic";
const DocumentContainer = dynamic(() => import("../documentContainer"), {
  ssr: false,
});
const MapContainer = dynamic(() => import("../mapContainer"), {
  ssr: false,
});

const STYLE_SCROLLBAR_CONTAINER = {
  backgroundColor: "#cecece",
  display: "block",
  marginBottom: "20px",
  padding: 3,
  marginRight: 50,
  maxWidth: 900,
  borderRadius: 15,
  marginLeft: 250,
  boxShadow: "0 0 1em black",
};

const STYLE_PDF_VIEWER = {
  backgroundColor: "#2a2b2c",
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  // boxShadow: "0 0.5rem 1rem black",

  borderRadius: "10px",
};

const PDFHighlighter = ({
  hidehighlighter,
  mutableElements,
  setMutableElements,
}) => {
  const { pagesHandler, scale } = useDocument();
  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });
  const [initialDimmensionsByPDF, setInitialDimmensionsByPDF] = useState({
    width: 0,
    height: 0,
  });

  return (
    <div>
      {pagesHandler && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "transparent",
            marginLeft: "250px",
            maxWidth: "900px",
          }}
        >
          <h3
            style={{
              color: "black",
              fontSize: "20px",
              marginTop: "40px",
            }}
          >
            Página: {pagesHandler?.currentPage} de {pagesHandler.totalPages}.
          </h3>
        </div>
      )}
      <div
        style={{
          ...STYLE_SCROLLBAR_CONTAINER,
          overflowX: `${mapContainerConfig.width > 800 ? "scroll" : "hidden"}`,
        }}
      >
        <div
          style={{
            ...STYLE_PDF_VIEWER,
            width: mapContainerConfig?.width + 30,
            height: mapContainerConfig?.height + 30,
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
    </div>
  );
};

export default PDFHighlighter;
