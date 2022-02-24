import React, { useState } from "react";
import PDFEditor from "./components/EditorPDF";
import PDFViewer from "./components/PDFViewer";
import { Plus, Minus, ArrowRight, ArrowLeft, Eye, EyeOff } from "react-feather";
import { Scalator, getPDFBlob } from "./helpers/fileHelpers";
const App = () => {
  const [scale, setScale] = useState(1);
  const [filePDF, setFilePDF] = useState(null);
  const [urlFilePDF, setUrlFilePDF] = useState();
  const [defaultDimmensions, setDefaultDimmensions] = useState();
  const [currentDimmensions, setCurrentDefaultDimmensions] = useState();
  const [toDrawer, setToDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const onChangeInput = (e) => {
    if (e.currentTarget?.files?.length) {
      const [pdf] = e.currentTarget.files;

      const urlFile = URL.createObjectURL(pdf);
      setUrlFilePDF(urlFile);
      setPage(1);

      return getPDFBlob(urlFile).then((blob) => {
        const pdfBlob = blob;

        setFilePDF(pdfBlob);
        const { defaultScale, currentScale } = Scalator(1, pdfBlob, page);
        setDefaultDimmensions(defaultScale);
        setCurrentDefaultDimmensions(currentScale);
      });
    }

    setUrlFilePDF(null);
  };

  const changeScale = (scale) => {
    const { currentScale } = Scalator(scale, filePDF, page);
    setCurrentDefaultDimmensions(currentScale);
  };
  console.log("def => ", defaultDimmensions);
  console.log("curr => ", currentDimmensions);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightblue",
            width: "800px",
            marginBottom: "50px",
          }}
        >
          <button
            onClick={() =>
              changeScale(
                currentDimmensions.scale < 10
                  ? currentDimmensions.scale + 0.2
                  : currentDimmensions.scale
              )
            }
          >
            <Plus />
          </button>
          <button
            onClick={() =>
              changeScale(
                currentDimmensions.scale > 1
                  ? currentDimmensions.scale - 0.2
                  : currentDimmensions.scale
              )
            }
          >
            <Minus />
          </button>
          <input
            type="file"
            style={{ margin: "0.5rem auto", padding: "1rem 5rem" }}
            onChange={onChangeInput}
          />
          <button
            onClick={() => setToDrawer(!toDrawer)}
            style={{
              width: "120px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {!toDrawer ? "MARCAR CAMPOS" : "VISUALIZAR PDF"}
            {!toDrawer ? (
              <Eye style={{ marginLeft: "10px" }} />
            ) : (
              <EyeOff style={{ marginLeft: "10px" }} />
            )}
          </button>
          <button
            onClick={() => setPage(page > 1 ? page - 1 : page)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <ArrowLeft style={{ marginLeft: "10px" }} />
          </button>
          <button
            onClick={() => setPage(page < filePDF.length ? page + 1 : page)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <ArrowRight style={{ marginLeft: "10px" }} />
          </button>
        </div>

        <div
          style={{
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: " column",
            borderRadius: "20px",
            padding: currentDimmensions?.width ? "20px" : null,
            width: currentDimmensions?.width || 0,
            height: currentDimmensions?.height || 0,
          }}
        >
          <PDFViewer
            currentDimmensions={currentDimmensions}
            urlFilePDF={urlFilePDF}
            pageNumber={page}
          />
          <PDFEditor
            defaultDimmensions={defaultDimmensions}
            currentDimmensions={currentDimmensions}
            toDrawer={toDrawer}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
