import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, Button, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  PlusOutlined,
  ToolOutlined,
  SettingOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import CreateModal from "../createModal";
import { useDocument } from "../../contexts/document";

const { SubMenu } = Menu;

const STYLE_MENU_CONTAINER = {
  backgroundColor: "red",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  top: "9vh",
  display: "flex",
  position: "fixed",
  right: 0,
};

const STYLE_MENU = {
  backgroundColor: "white",
  boxShadow: "0 0.5rem 1rem black",
  border: 0,
  maxWidth: "300px",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  right: 0,
  position: "fixed",
  top: "9vh",
};

const LOCAL_STORAGE_KEY = "@pdfmap";

const MenuOfElements = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed((prevState) => !prevState);
  const toggleShowCreateModal = () =>
    setShowCreateModal((prevState) => !prevState);

  const handleSetUrlFromFile = (event) => {
    if (event.currentTarget?.files?.length) {
      const [pdf] = event.currentTarget.files;
      setUrl(URL.createObjectURL(pdf));
      return;
    }
    setUrl(null);
  };
  return (
    <Menu
      style={STYLE_MENU}
      defaultSelectedKeys={["1"]}
      mode="vertical"
      theme="light"
      inlineCollapsed={collapsed}
    >
      <div
        style={{
          backgroundColor: "#f1c845",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: "2px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            textAlign: "justify",
            marginTop: "5px",
          }}
        >
          Elements
        </h3>
      </div>

      <SubMenu
        key="sub2"
        icon={<ToolOutlined />}
        title="Map Tools"
        // disabled={!url}
      ></SubMenu>
    </Menu>
  );
};

export default MenuOfElements;
