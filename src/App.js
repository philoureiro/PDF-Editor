import React, { useState } from "react";
import PDFEditor from "./components/EditorPDF";
import PDFViewer from "./components/PDFViewer";
import { Plus, Minus } from "react-feather";

const App = () => {
  const [scale, setScale] = useState(1);
  return (
    <React.Fragment>
      <button onClick={() => setScale(scale < 5 ? scale + 1 : scale)}>
        <Plus />
      </button>
      <button onClick={() => setScale(scale > 1 ? scale - 1 : scale)}>
        <Minus />
      </button>
      <PDFViewer scale={scale} />
    </React.Fragment>
  );
};

export default App;
