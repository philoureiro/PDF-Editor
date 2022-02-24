import React, { useEffect, useState, useRef, useMemo } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { scaleXY } from "../helpers/scaleXY";
import { BrowserDetect } from "../helpers/browserDetect";
const PDFViewer = ({ scale, filePDF, toDrawer }) => {
  const element = document?.getElementsByClassName("react-pdf__Page__canvas");

  const [numPages, setNumPages] = useState();
  const PDFRef = useRef();
  const PDFRef2 = useRef();

  const [width, setWidth] = useState(772);
  const [height, setHeight] = useState(999);

  const verifyDimmensions = () => {
    if (element[0]) {
      console.log("WID - QUERY", element[0].clientWidth);
      console.log("HEIG - QUERY", element[0].clientHeight);
    } else {
      console.log("* nao tem elemento na query");
    }
    if (PDFRef?.current) {
      console.log("WID -  REF", PDFRef?.current?.offsetWidth);
      console.log("HEIG - REF", PDFRef?.current?.offsetHeight);
    } else {
      console.log("* nao tem referencia");
    }
  };

  useEffect(() => {
    const browserName = BrowserDetect();
    console.log("NAVEGADOR =>   ", browserName.toUpperCase());
    const { width } = scaleXY(scale, browserName);
    const { height } = scaleXY(scale, browserName);
    setWidth(width);
    setHeight(height);
    console.log("=======> INICIO DO EFFECT ===> ");
    // verifyDimmensions();
    console.log("=======> FIM DO EFFECT ===> ");
  }, [filePDF, scale, PDFRef.current, toDrawer]);

  useMemo(() => {
    console.log("=======> INICIO DO MEMO ===> ");
    // verifyDimmensions();
    console.log("=======> FIM DO MEMO ===> ");
  }, []);

  return (
    filePDF && (
      <div style={{ height: height, width: width }}>
        <Document
          file={filePDF}
          onLoadSuccess={(numPages) => setNumPages(numPages)}
        >
          <Page pageNumber={2} scale={scale} inputRef={PDFRef} />
          {console.log("=======> INICIO DO NORMAL ===> ")}
          {/* {verifyDimmensions()} */}
          {console.log("=======> FIM DO NORMAL ===> ")}
        </Document>
      </div>
    )
  );
};
export default PDFViewer;
