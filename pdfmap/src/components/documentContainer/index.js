import React, { useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import PropTypes from "prop-types";
import { useDocument } from "../../contexts/document";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function DocumentContainer({ setDocumentSize, dimmensions }) {
  const {
    pagesHandler,
    setPagesHandler,
    scale,
    url,
    setInitialHeight,
    setInitialWidth,
  } = useDocument();

  const documentRef = useRef(null);

  const setTotalPages = ({ numPages }) =>
    setPagesHandler((prevState) => ({ ...prevState, totalPages: numPages }));

  const getDocumentPageSize = () => {
    const { width, height } = documentRef.current.getBoundingClientRect();
    console.log(width, height);
    if (scale === 1) {
      console.log(scale);
      setInitialWidth(width);
      setInitialHeight(height);
    }
    setDocumentSize({ width, height });
  };

  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        width: dimmensions?.width,
        height: dimmensions?.height,
        display: "flex",
        position: "relative",
        top: 0,
      }}
    >
      <Document
        file={url}
        noData=""
        onLoadSuccess={setTotalPages}
        onLoadError={console.error}
      >
        <Page
          scale={scale}
          onRenderSuccess={getDocumentPageSize}
          pageNumber={pagesHandler.currentPage}
          inputRef={documentRef}
        />
      </Document>
    </div>
  );
}

DocumentContainer.propTypes = {
  setDocumentSize: PropTypes.func.isRequired,
};

export default DocumentContainer;
