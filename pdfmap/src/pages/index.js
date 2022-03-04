import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import { useDocument } from "../contexts/document";
import SideMenu from "../components/sideMenu";

const PDFHighlighter = dynamic(() => import("../components/PDFHighlighter"));
const MenuOfElements = dynamic(() => import("../components/MenuOfElements"));
const ActionsButtons = dynamic(() => import("../components/ActionsButtons"));
const STYLE_MAIN = {
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  right: "0px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  //backgroundColor: "#a0a0a0",
  backgroundColor: "transparent",
};

export default function Home() {
  const [mutableElements, setMutableElements] = useState([]);
  const [hidehighlighter, setHideHighlighter] = useState(false);
  const [immutableElements, setImmutableElements] = useState([]);

  const { scale, url } = useDocument();

  const handleAddElement = (element) => {
    const newElement = { ...element, x: 0, y: 0, id: uuidv4() };
    setImmutableElements((prevElements) => [...prevElements, newElement]);
    setMutableElements((prevElements) => [...prevElements, newElement]);
  };

  const resizeElementsByScale = () => {
    const items = immutableElements.map(
      ({ x, y, width, height, ...restElement }) => ({
        ...restElement,
        x: x * scale,
        y: y * scale,
        width: width * scale,
        height: height * scale,
      })
    );
    setMutableElements(items);
  };

  useEffect(() => {
    resizeElementsByScale();
  }, [scale, immutableElements]);

  return (
    <main style={STYLE_MAIN}>
      {url && (
        <PDFHighlighter
          hidehighlighter={hidehighlighter}
          mutableElements={mutableElements}
          setMutableElements={setMutableElements}
        />
      )}
      <SideMenu
        onAddElement={handleAddElement}
        mutableElements={mutableElements}
        setMutableElements={setMutableElements}
        setImmutableElements={setImmutableElements}
      />

      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          // minHeight: "2000px",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexDirection: "column",
          right: 0,
          // position: "fixed",
        }}
      >
        <ActionsButtons
          hidehighlighter={hidehighlighter}
          setHideHighlighter={setHideHighlighter}
        />
        <MenuOfElements />
      </div>
    </main>
  );
}
