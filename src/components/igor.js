import React from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

// import('bulma/css/bulma.css');
// import('material-design-icons/iconfont/material-icons.css');

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
    x: 800,
    y: 400,
    width: 250,
    height: 50,
    fill: "green",
    id: "rect2",
  },
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  const [filePdf, setFilePdf] = React.useState(null);
  const [showDrag, setShowDrag] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

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
  // console.log(pdfInfoRef.current.offsetWidth);
  // console.log(pdfInfoRef.current.offsetHeight);

  return (
    <div
      style={{
        overflowX: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        style={{ margin: "0.5rem auto", padding: "1rem 5rem" }}
        onChange={onChangeInput}
      />

      {!!filePdf ? (
        <div>
          <Document file={filePdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} height={1000} inputRef={pdfInfoRef} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      ) : null}

      {showDrag ? (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight - 200}
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
          <button
            style={{ margin: "10px" }}
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
    </div>
  );
};

export default App;
