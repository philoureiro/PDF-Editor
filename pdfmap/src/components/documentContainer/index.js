import { useState, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function DocumentContainer({
  document,
  scale,
  setDocumentSize,
}) {
  const [pagesHandler, setPagesHandler] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const documentRef = useRef(null);

  const setTotalPages = ({ numPages }) =>
    setPagesHandler(prevState => ({ ...prevState, totalPages: numPages }));

  const getDocumentPageSize = () => {
    console.log(
      'getDocumentPageSize = ',
      documentRef.current.getBoundingClientRect()
    );
    console.log('current = ', documentRef.current);
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
