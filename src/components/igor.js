import React from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

// import('bulma/css/bulma.css');
// import('material-design-icons/iconfont/material-icons.css');

const PDF_HEIGHT = 1500;

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // igor

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 150,
    y: 75,
    width: 250,
    height: 50,
    fill: "green",
    id: "rect1",
  },
  {
    x: 800,
    y: 400,
    width: 250,
    height: 50,
    fill: "gray",
    id: "rect2",
  },
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  const [filePdf, setFilePdf] = React.useState(null);
  const [showDrag, setShowDrag] = React.useState(false);
  const [showPdf, setShowPdf] = React.useState(true);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);

  const pdfInfoRef = React.useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const onChangeInput = (e) => {
    if (e.currentTarget?.files?.length) {
      const [pdf] = e.currentTarget.files;
      setFilePdf(URL.createObjectURL(pdf));
      return;
    }
    setFilePdf(null);
  };

  const onClickButton = () => {
    setShowDrag((prevState) => !prevState);
  };

  const onClickButton2 = () => {
    setShowPdf((prevState) => !prevState);
  };

  const zoomIn = () => {
    if (zoom >= 3) return;
    setZoom((prevState) => prevState + 0.2);
  };

  const zoomOut = () => {
    if (zoom <= 0.2) return;
    setZoom((prevState) => prevState - 0.2);
  };

  React.useEffect(() => {
    console.log("width: ", pdfInfoRef.current?.offsetWidth);
    console.log("height: ", pdfInfoRef.current?.offsetHeight);
    console.log("scale: ", zoom);
  }, [zoom]);

  const zoomStyle = { padding: 20, margin: 10 };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        style={{
          margin: "0.5rem auto",
          padding: "1rem 5rem",
          position: "absolute",
          left: 0,
        }}
        onChange={onChangeInput}
      />

      <div style={{ position: "absolute", right: 0 }}>
        <button
          type="button"
          onClick={zoomIn}
          style={zoomStyle}
          disabled={zoom >= 3}
        >
          +
        </button>
        <button
          type="button"
          onClick={zoomOut}
          style={zoomStyle}
          disabled={zoom <= 0.2}
        >
          -
        </button>
      </div>

      {!!filePdf && showPdf ? (
        <div>
          <Document file={filePdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} inputRef={pdfInfoRef} scale={zoom} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      ) : null}

      {showDrag ? (
        <Stage
          width={pdfInfoRef.current?.offsetWidth || 10}
          height={pdfInfoRef.current?.offsetHeight || 10}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{ position: "absolute", top: 0, border: "1px solid red" }}
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      ) : null}

      {!!filePdf ? (
        <div>
          <button
            style={{ margin: "10px" }}
            disabled={pageNumber === 1}
            onClick={() =>
              setPageNumber((prevPage) => {
                if (prevPage === 1) return prevPage;
                return prevPage - 1;
              })
            }
          >
            {"<="}
          </button>
          <button style={{ margin: "10px" }} onClick={onClickButton}>
            {showDrag ? "Fechar" : "Mapear"}
          </button>
          <button style={{ margin: "10px" }} onClick={onClickButton2}>
            {showPdf ? "Esconder" : "Mostrar"}
          </button>
          <button
            style={{ margin: "10px" }}
            disabled={pageNumber === numPages}
            onClick={() =>
              setPageNumber((prevPage) => {
                if (prevPage === numPages) return prevPage;
                return prevPage + 1;
              })
            }
          >
            {"=>"}
          </button>
        </div>
      ) : null}

      <div
        style={{
          backgroundColor: "red",
          width: pdfInfoRef.current?.offsetWidth || 10,
          height: PDF_HEIGHT,
        }}
      >
        <h1>DIV MESMO TAMANHO DO PDF</h1>
      </div>
    </div>
  );
};

export default App;
