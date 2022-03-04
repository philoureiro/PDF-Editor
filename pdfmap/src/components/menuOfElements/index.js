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
  ApartmentOutlined,
  FontSizeOutlined,
  FieldNumberOutlined,
  CheckSquareOutlined,
  FieldTimeOutlined,
  BorderOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import CreateModal from "../createModal";
import { useDocument } from "../../contexts/document";

const { SubMenu } = Menu;

const STYLE_MENU_CONTAINER = {
  backgroundColor: "transparent",
  flexDirection: "column",
  justifyContent: "right",
  alignItems: "flex-end",
  top: "9vh",
  display: "flex",
  position: "fixed",
  right: "1vw",
  width: 150,
  //   height: 250,
};

const STYLE_MENU = {
  backgroundColor: "white",
  boxShadow: "0 0.3rem 0.5rem black",
  border: 0,
  borderRadius: "10px",

  maxWidth: "300px",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  // maxHeight: 700,
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
    <div style={STYLE_MENU_CONTAINER}>
      <Menu
        style={STYLE_MENU}
        defaultSelectedKeys={["1"]}
        mode="vertical"
        theme="light"
        color="red"
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
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            boxShadow: "0 0.1rem 0.2rem black",
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
          key="sub1"
          icon={<FontSizeOutlined />}
          title="Text"
          // disabled={!url}
        >
          <Menu.Item
            key="1"
            icon={<DeleteOutlined />}
            // onClick={loadStoragedChanges}
            // disabled={loadChanges.length === 0}
          >
            text 1
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<DeleteOutlined />}
            // onClick={loadStoragedChanges}
            // disabled={loadChanges.length === 0}
          >
            text 2
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<DeleteOutlined />}
            // onClick={loadStoragedChanges}
            // disabled={loadChanges.length === 0}
          >
            text 3
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub2"
          icon={<FieldNumberOutlined />}
          title="Number"
          // disabled={!url}
        >
          Number
        </SubMenu>

        <SubMenu
          key="sub3"
          icon={<FieldTimeOutlined />}
          title="Date"
          // disabled={!url}
        >
          Date
        </SubMenu>

        <SubMenu
          key="sub4"
          icon={<CheckSquareOutlined />}
          title="Checkbox"
          // disabled={!url}
        >
          Checkbox
        </SubMenu>

        <SubMenu
          key="sub5"
          icon={<BorderOutlined />}
          title="TextArea"
          // disabled={!url}
        >
          TextArea
        </SubMenu>
      </Menu>
    </div>
  );
};

export default MenuOfElements;
