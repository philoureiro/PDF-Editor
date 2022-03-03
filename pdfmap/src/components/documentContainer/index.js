import React, { useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import PropTypes from "prop-types";
import { useDocument } from "../../contexts/document";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function DocumentContainer({ setDocumentSize, setInitialDimmensionsByPDF }) {
  const { pagesHandler, setPagesHandler, scale, url } = useDocument();

  const setTotalPages = ({ numPages }) =>
    setPagesHandler((prevState) => ({ ...prevState, totalPages: numPages }));

  const documentRef = useRef(null);
  const getDocumentPageSize = () => {
    const { width, height } = documentRef.current.getBoundingClientRect();

    if (scale === 1) {
      setInitialDimmensionsByPDF({ width, height });
    }
    setDocumentSize({ width, height });
  };

  return (
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
  );
}

DocumentContainer.propTypes = {
  setDocumentSize: PropTypes.func.isRequired,
};

export default DocumentContainer;
