import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { scaleXY } from "../helpers/scaleXY";
const PDFViewer = ({ scale }) => {
  const [numPages, setNumPages] = useState();
  const [filePDF, setFilePDF] = useState(null);
  const [width, setWidth] = useState("772px");
  const [height, setHeight] = useState("999px");

  const onChangeInput = (e) => {
    if (e.currentTarget?.files?.length) {
      const [pdf] = e.currentTarget.files;
      setFilePDF(URL.createObjectURL(pdf));
      return;
    }
    setFilePDF(null);
  };

  useEffect(() => {
    const { width } = scaleXY(scale);
    const { height } = scaleXY(scale);

    setWidth(width);
    setHeight(height);
  }, [filePDF, scale]);

  return (
    <React.Fragment>
      <input
        type="file"
        style={{ margin: "0.5rem auto", padding: "1rem 5rem" }}
        onChange={onChangeInput}
      />

      {filePDF && (
        <div
          style={{
            backgroundColor: "black",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <Document
            file={filePDF}
            onLoadSuccess={(numPages) => setNumPages(numPages)}
          >
            <Page pageNumber={2} height={1000} scale={1} />
          </Document>
        </div>
      )}
    </React.Fragment>
  );
};
export default PDFViewer;
