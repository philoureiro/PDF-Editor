import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const DocContext = createContext();

function DocumentContext({ children }) {
  const [url, setUrl] = useState("");
  const [scale, setScale] = useState(1);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [pagesHandler, setPagesHandler] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const contextValues = {
    url,
    setUrl,
    scale,
    initialWidth,
    setInitialWidth,
    initialHeight,
    setInitialHeight,
    setScale,
    pagesHandler,
    setPagesHandler,
  };

  return (
    <DocContext.Provider value={contextValues}>{children}</DocContext.Provider>
  );
}

DocumentContext.propTypes = {
  children: PropTypes.node,
};

export function useDocument() {
  const {
    url,
    setUrl,
    scale,
    setScale,
    initialHeight,
    initialWidth,
    setInitialHeight,
    setInitialWidth,
    pagesHandler,
    setPagesHandler,
  } = useContext(DocContext);

  return {
    url,
    setUrl,
    scale,
    setScale,
    initialHeight,
    setInitialWidth,
    setInitialHeight,
    initialWidth,
    pagesHandler,
    setPagesHandler,
  };
}

export default DocumentContext;
