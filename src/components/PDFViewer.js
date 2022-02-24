import React, { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { scaleXY } from "../helpers/scaleXY";
import { BrowserDetect } from "../helpers/browserDetect";
const PDFViewer = ({ scale, filePDF }) => {
  const [numPages, setNumPages] = useState();
  const PDFRef = useRef();

  const [width, setWidth] = useState(772);
  const [height, setHeight] = useState(999);

  const verifyDimmensions = () => {
    if (PDFRef.current) {
      const pdf = document.getElementsByClassName("react-pdf__Page__canvas");
      console.log(pdf[0]);
      // console.log(
      //   "ne pussive" +
      //     document.getElementsByClassName("react-pdf__Page__canvas").height
      // );
      console.log(BrowserDetect());
      console.log(PDFRef.current.offsetWidth);
      console.log(PDFRef.current.offsetHeight);
    }
    console.log("nao tem");
  };
  useEffect(() => {
    const browserName = BrowserDetect();

    const { width } = scaleXY(scale, browserName);
    const { height } = scaleXY(scale, browserName);
    verifyDimmensions();

    setWidth(width);
    setHeight(height);
  }, [filePDF, scale]);

  return (
    <React.Fragment>
      {filePDF && (
        <div
          ref={PDFRef}
          style={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Document
            file={filePDF}
            onLoadSuccess={(numPages) => setNumPages(numPages)}
          >
            <Page pageNumber={2} height={1000} scale={scale} />
          </Document>
        </div>

        /* <div
            style={{
              backgroundColor: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: `${height}px`,
              width: `${width}px`,
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {/* <div
              ref={PDFRef}
              style={{
                backgroundColor: "black",

                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                height: `${height}px`,
                width: `${width}px`,
              }}
            >
              <Document
                file={filePDF}
                onLoadSuccess={(numPages) => setNumPages(numPages)}
              >
                <Page ref={PDFRef} pageNumber={2} height={1000} scale={scale} />
              </Document>
            </div> */
        //<div/>
      )}
    </React.Fragment>
  );
};
export default PDFViewer;
