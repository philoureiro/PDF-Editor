import React, { useEffect, useState, useRef, useMemo } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Scalator } from "../helpers/fileHelpers";
import { BrowserDetect } from "../helpers/browserDetect";
const PDFViewer = ({ urlFilePDF, hidePDF, currentDimmensions, pageNumber }) => {
  let width, height;

  const [numPages, setNumPages] = useState(1);

  // const verifyDimmensions = () => {
  //   if (element[0]) {
  //     console.log("WID - QUERY", element[0].clientWidth);
  //     console.log("HEIG - QUERY", element[0].clientHeight);
  //   } else {
  //     console.log("* nao tem elemento na query");
  //   }
  //   if (PDFRef?.current) {
  //     console.log("WID -  REF", PDFRef?.current?.offsetWidth);
  //     console.log("HEIG - REF", PDFRef?.current?.offsetHeight);
  //   } else {
  //     console.log("* nao tem referencia");
  //   }
  // };

  if (currentDimmensions) {
    width = currentDimmensions?.width;
    height = currentDimmensions?.height;
  }

  useEffect(() => {
    //const browserName = BrowserDetect();
    // console.log("NAVEGADOR =>   ", browserName.toUpperCase());
    // const { width } = Scalator(scale, browserName);
    // const { height } = Scalator(scale, browserName);
    // setWidth(width);
    // setHeight(height);
    // console.log("=======> INICIO DO EFFECT ===> ");
    // // verifyDimmensions();
    // console.log("=======> FIM DO EFFECT ===> ");
  }, [urlFilePDF, hidePDF, currentDimmensions]);

  useMemo(() => {
    // console.log("=======> INICIO DO MEMO ===> ");
    // verifyDimmensions();
    // console.log("=======> FIM DO MEMO ===> ");
  }, []);

  return (
    <React.Fragment>
      {urlFilePDF && (
        <div>
          <Document
            file={urlFilePDF}
            onLoadSuccess={(numPages) => setNumPages(numPages)}
          >
            <Page pageNumber={pageNumber || 1} width={width} height={height} />
          </Document>
        </div>
      )}
    </React.Fragment>
  );
};
export default PDFViewer;
