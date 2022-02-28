import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function DocumentContainer({
  document,
  scale,
  setDocumentSize,
  documentRef,
}) {
  const [pagesHandler, setPagesHandler] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const setTotalPages = ({ numPages }) =>
    setPagesHandler(prevState => ({ ...prevState, totalPages: numPages }));

  const getDocumentPageSize = () => {
    const { width, height } = documentRef.current.getBoundingClientRect();
    setDocumentSize({ width, height });
  };

  return (
    <>
      <Document
        file={document}
        onLoadSuccess={setTotalPages}
        onLoadError={console.error}
        inputRef={documentRef}
      >
        <Page
          scale={scale}
          onRenderSuccess={getDocumentPageSize}
          pageNumber={pagesHandler.currentPage}
        />
      </Document>
      <div style={{ textAlign: 'center' }}>
        <span>Page: {pagesHandler.currentPage}</span>
        <span>Total: {pagesHandler.totalPages}</span>
      </div>
    </>
  );
}
