import React, { useRef } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import PropTypes from 'prop-types'
import { useDocument } from '../../contexts/document'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`
function DocumentContainer ({ setDocumentSize }) {
  const { pagesHandler, setPagesHandler, scale, url } = useDocument()

  const documentRef = useRef(null)

  const setTotalPages = ({ numPages }) =>
    setPagesHandler(prevState => ({ ...prevState, totalPages: numPages }))

  const getDocumentPageSize = () => {
    const { width, height } = documentRef.current.getBoundingClientRect()
    setDocumentSize({ width, height })
  }

  return (
    <>
      <Document
        file={url}
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
  )
}

DocumentContainer.propTypes = {
  setDocumentSize: PropTypes.func.isRequired
}

export default DocumentContainer
