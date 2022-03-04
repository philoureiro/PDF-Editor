import React from "react";
import { Button, message } from "antd";
import { RiEyeLine } from "@react-icons/all-files/ri/RiEyeLine";
import { RiEyeOffLine } from "@react-icons/all-files/ri/RiEyeOffLine";
import { GrUndo } from "@react-icons/all-files/gr/GrUndo";
import { GrRedo } from "@react-icons/all-files/gr/GrRedo";

const STYLE_BUTTON_CONTAINER = {
  display: "flex",
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
  borderRadius: "5px",
  boxShadow: "0 0.1rem 0.2rem black",
  alignItems: "center",
  justifyContent: "space-around",
};

const STYLE_ACTION_BUTTONS_CONTAINER = {
  display: "flex",
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "2vh",
  right: "1vw",
  backgroundColor: "transparent",
};

const ActionsButtons = ({ hidehighlighter, setHideHighlighter }) => {
  return (
    <div style={STYLE_ACTION_BUTTONS_CONTAINER}>
      <Button
        style={{
          ...STYLE_BUTTON_CONTAINER,
          marginRight: "3px",
          // left: `${typeof window !== undefined ? window.innerWidth : 0}px`,
        }}
      >
        <GrUndo />
      </Button>
      <Button
        onClick={() => setHideHighlighter(!hidehighlighter)}
        style={{
          ...STYLE_BUTTON_CONTAINER,
          marginRight: "3px",
        }}
      >
        {hidehighlighter ? (
          <RiEyeLine size={22} style={{ marginRight: "8px" }} />
        ) : (
          <RiEyeOffLine size={22} style={{ marginRight: "8px" }} />
        )}
        {`${hidehighlighter ? "Mostrar Mapeamento" : "Ocultar Mapeamento"}`}
      </Button>
      <Button
        style={{
          ...STYLE_BUTTON_CONTAINER,
        }}
      >
        <GrRedo />
      </Button>
    </div>
  );
};

export default ActionsButtons;
