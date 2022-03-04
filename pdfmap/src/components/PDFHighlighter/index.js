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
  boxShadow: "0 0 0.4rem 0.2rem black",
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
            marginLeft: "200px",
            maxWidth: "970px",
            marginBottom: "10px",
          }}
        >
          <h3
            style={{
              color: "black",
              fontSize: "20px",
              marginTop: "40px",
              backgroundColor: "transparent",
              height: "35px",
              borderRadius: "5px",
              textAlign: "center",
              minWidth: "180px",
              boxShadow: "0 0rem 0.2rem gray",
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
            width: mapContainerConfig?.width + 32,
            height: mapContainerConfig?.height + 32,
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
