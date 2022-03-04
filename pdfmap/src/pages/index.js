import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import { EyeOutlined, EyeInvisibleTwoTone } from "@ant-design/icons";
import { useDocument } from "../contexts/document";
import SideMenu from "../components/sideMenu";

const PDFHighlighter = dynamic(() => import("../components/PDFHighlighter"));
const STYLE_MAIN = {
  width: "100rem",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  right: "0px",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "top",
  backgroundColor: "#a0a0a0",
};

const STYLE_SIDE_MENU_CONTAINER = {
  display: "flex",
  top: 0,
  left: 10,
  backgroundColor: "green",
  width: "400px",
  height: "100rem",
  flexDirection: "row",
};

const STYLE_BUTTON_CONTAINER = {
  display: "flex",
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  position: "fixed",
  top: "2vh",
  right: "2vw",
  width: "190px",
  borderRadius: "5px",
  boxShadow: "0 0.5rem 1rem black",
  alignItems: "center",
  justifyContent: "space-around",
};

export default function Home() {
  const [mutableElements, setMutableElements] = useState([]);
  const [hidehighlighter, setHideHighlighter] = useState(false);
  const [immutableElements, setImmutableElements] = useState([]);

  const { scale, url, width, height, setHeight, setWidth } = useDocument();

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
      <Button
        onClick={() => setHideHighlighter(!hidehighlighter)}
        style={STYLE_BUTTON_CONTAINER}
      >
        {`${hidehighlighter ? "Mostrar marcação" : "Ocultar marcação"}`}
        {hidehighlighter ? (
          <EyeOutlined style={{ backgroundColor: "white" }} />
        ) : (
          <EyeInvisibleTwoTone style={{ backgroundColor: "white" }} />
        )}
      </Button>
    </main>
  );
}
