import React, { useState } from "react";
import PDFEditor from "./components/EditorPDF";
import PDFViewer from "./components/PDFViewer";
import { Plus, Minus } from "react-feather";

const App = () => {
  const [scale, setScale] = useState(1);
  const [filePDF, setFilePDF] = useState(null);
  const onChangeInput = (e) => {
    if (e.currentTarget?.files?.length) {
      const [pdf] = e.currentTarget.files;

      const pdfBlob = URL.createObjectURL(pdf);

      setFilePDF(pdfBlob);
      return;
    }
    setFilePDF(null);
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "lightblue",
          width: "800px",
          marginBottom: "50px",
        }}
      >
        <button onClick={() => setScale(scale < 5 ? scale + 1 : scale)}>
          <Plus />
        </button>
        <button onClick={() => setScale(scale > 1 ? scale - 1 : scale)}>
          <Minus />
        </button>
        <input
          type="file"
          style={{ margin: "0.5rem auto", padding: "1rem 5rem" }}
          onChange={onChangeInput}
        />
      </div>

      <PDFViewer scale={scale} filePDF={filePDF} />
    </React.Fragment>
  );
};

export default App;
