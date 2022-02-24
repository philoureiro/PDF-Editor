import React, { useEffect, useState, useRef, useMemo } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Scalator } from "../helpers/fileHelpers";
import { BrowserDetect } from "../helpers/browserDetect";
const PDFViewer = ({ urlFilePDF, hidePDF, currentDimmensions, pageNumber }) => {
  let width, height;

  const [numPages, setNumPages] = useState(1);
  const PDFref = useRef();
  if (currentDimmensions) {
    width = currentDimmensions?.width;
    height = currentDimmensions?.height;
  }

  useEffect(() => {
    //const browserName = BrowserDetect()
  }, [urlFilePDF, hidePDF, currentDimmensions]);

  return (
    <React.Fragment>
      {urlFilePDF && (
        <div
          style={{
            width,
            height,
            backgroundColor: "red",
            display: "flex",
            zIndex: 0,
            top: 0,
          }}
        >
          <Document
            file={urlFilePDF}
            onLoadSuccess={(numPages) => setNumPages(numPages)}
          >
            <Page
              inputRef={PDFref}
              pageNumber={pageNumber || 1}
              scale={currentDimmensions?.scale || 1}
            />
          </Document>
        </div>
      )}
    </React.Fragment>
  );
};
export default PDFViewer;
