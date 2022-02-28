import React, { useState, useRef } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import CreateModal from '../createModal';

const { SubMenu } = Menu;

export default function SideMenu({ onAddElement, setDocument }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const inputDocumentRef = useRef(null);

  const toggleCollapsed = () => setCollapsed(prevState => !prevState);

  const toggleShowCreateModal = () =>
    setShowCreateModal(prevState => !prevState);

  const handleSetUrlFromFile = event => {
    if (event.currentTarget?.files?.length) {
      const [pdf] = event.currentTarget.files;
      setDocument(URL.createObjectURL(pdf));
      return;
    }
    setDocument(null);
  };

  const onClickInputDocument = () => inputDocumentRef.current?.click();

  return (
    <>
      <CreateModal
        visible={showCreateModal}
        toggleVisible={toggleShowCreateModal}
        addElement={onAddElement}
      />
      <div style={{ width: 256, position: 'absolute', left: 10, top: 10 }}>
        <Button
          type='primary'
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          theme='light'
          inlineCollapsed={collapsed}
        >
          <Menu.Item
            key='1'
            icon={<UploadOutlined />}
            onClick={onClickInputDocument}
          >
            Upload Document
            <input
              type='file'
              onChange={handleSetUrlFromFile}
              ref={inputDocumentRef}
              hidden
            />
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<PlusOutlined />}
            onClick={toggleShowCreateModal}
          >
            Create Element
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
