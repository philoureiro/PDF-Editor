import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { ArrowLeft, ArrowRight } from "react-feather";
import PDF from "./template.pdf";

const PDFViewer = () => {
  const [numberPages, setNumberPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filename, setFilename] = useState();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "red",
        width: "800px",
        height: "1200px",
      }}
    >
      {/* <iframe
        id="myIframe"
        src={PDF}
        style={{ width: "100%", height: "100vh" }}
        type="application/pdf"
      /> */}
      <Document
        loading={<h3>loading...</h3>}
        onContextMenu={(e) => e.preventDefault()}
        file={PDF}
        //file="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf?hsLang=en"
        onLoadSuccess={({ numPages }) => setNumberPages(numPages)}
      >
        <Page pageNumber={pageNumber} scale={1.5} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <p>
            Página {pageNumber} de {numberPages}
          </p>
          <div>
            <button
              color={pageNumber === 1 ? "light" : "primary"}
              onClick={() =>
                setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber)
              }
            >
              <ArrowLeft className="mr-3" size={20} />
              Página anterior
            </button>

            <button
              color={pageNumber === numberPages ? "light" : "primary"}
              className="ml-3"
              onClick={() =>
                setPageNumber(
                  pageNumber < numberPages ? pageNumber + 1 : pageNumber
                )
              }
            >
              Próxima página
              <ArrowRight className="ml-3" size={20} />
            </button>
          </div>
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
