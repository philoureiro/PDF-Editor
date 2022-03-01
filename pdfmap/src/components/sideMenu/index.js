import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, message } from 'antd'
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
  ReloadOutlined
} from '@ant-design/icons'

import CreateModal from '../createModal'
import { useDocument } from '../../contexts/document'

const { SubMenu } = Menu

const LOCAL_STORAGE_KEY = '@pdfmap'

function SideMenu ({
  onAddElement,
  mutableElements,
  setMutableElements,
  setImmutableElements
}) {
  const { pagesHandler, setPagesHandler, setUrl, scale, setScale, url } = useDocument()

  const { currentPage, totalPages } = pagesHandler

  const [collapsed, setCollapsed] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loadChanges, setLoadChanges] = useState([])

  const inputDocumentRef = useRef(null)

  const toggleCollapsed = () => setCollapsed(prevState => !prevState)

  const toggleShowCreateModal = () =>
    setShowCreateModal(prevState => !prevState)

  const handleSetUrlFromFile = event => {
    if (event.currentTarget?.files?.length) {
      const [pdf] = event.currentTarget.files
      setUrl(URL.createObjectURL(pdf))
      return
    }
    setUrl(null)
  }

  const onClickInputDocument = () => inputDocumentRef.current?.click()

  const incrimentScale = () => {
    setScale(prevState => {
      if (prevState >= 2.5) return prevState
      return Number((prevState + 0.3).toFixed(1))
    })
  }

  const decrementScale = () => {
    setScale(prevState => {
      if (prevState <= 0.6) return prevState
      return Number((prevState - 0.3).toFixed(1))
    })
  }

  const nextPage = () => {
    setPagesHandler(prevState => {
      if (prevState.currentPage >= prevState.totalPages) return prevState
      return { ...prevState, currentPage: prevState.currentPage + 1 }
    })
  }

  const previousPage = () => {
    setPagesHandler(prevState => {
      if (prevState.currentPage <= 1) return prevState
      return { ...prevState, currentPage: prevState.currentPage - 1 }
    })
  }

  const saveChanges = () => {
    const changes = JSON.stringify(removeScale(mutableElements))
    localStorage.setItem(LOCAL_STORAGE_KEY, changes)
    message.success('Your changes have been saved!')
  }

  const removeScale = (array) => {
    return array.map(item => {
      const { x, y, width, height } = item
      return {
        ...item,
        x: x / scale,
        y: y / scale,
        width: width / scale,
        height: height / scale
      }
    })
  }

  const loadStoragedChanges = () => {
    setImmutableElements(loadChanges)
    setMutableElements(loadChanges)
    message.success('Your changes have been loaded!')
  }

  useEffect(() => {
    const changes = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (changes) setLoadChanges(JSON.parse(changes))
    else if (changes === null) setLoadChanges([])
  }, [])

  return (
    <>
      <CreateModal
        visible={showCreateModal}
        toggleVisible={toggleShowCreateModal}
        addElement={onAddElement}
      />
      <div
        style={{
          width: 256,
          position: 'fixed',
          left: 10,
          top: 10,
          zIndex: 100
        }}
      >
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
          <SubMenu
            key='sub1'
            icon={<SettingOutlined />}
            title='Document Settings'
            disabled={!url}
          >
            <Menu.Item key='2'>
              <div style={{ display: 'flex' }}>
                <div onClick={decrementScale} style={{ flex: 1 }}>
                  <ZoomOutOutlined />
                </div>
                <div style={{ flex: 1 }}>{scale}x</div>
                <div onClick={incrimentScale}>
                  <ZoomInOutlined />
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key='3'>
              <div style={{ display: 'flex' }}>
                <div onClick={previousPage} style={{ flex: 1 }}>
                  <LeftOutlined />
                </div>
                <div style={{ flex: 1 }}>
                  {currentPage}/{totalPages}
                </div>
                <div onClick={nextPage}>
                  <RightOutlined />
                </div>
              </div>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key='sub2'
            icon={<ToolOutlined />}
            title='Map Tools'
            disabled={!url}
          >
            <Menu.Item
              key='4'
              icon={<PlusOutlined />}
              onClick={toggleShowCreateModal}
            >
              Create Element
            </Menu.Item>
            <Menu.Item
              key='5'
              icon={<CheckOutlined />}
              onClick={saveChanges}
              disabled={mutableElements.length === 0}
            >
              Save changes
            </Menu.Item>
            <Menu.Item
              key='6'
              icon={<ReloadOutlined />}
              onClick={loadStoragedChanges}
              disabled={loadChanges.length === 0}
            >
              Load changes
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </>
  )
}

SideMenu.propTypes = {
  onAddElement: PropTypes.func.isRequired,
  mutableElements: PropTypes.array.isRequired,
  setMutableElements: PropTypes.func.isRequired,
  setImmutableElements: PropTypes.func.isRequired
}

export default SideMenu
