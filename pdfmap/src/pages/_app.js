import React from 'react'
import PropTypes from 'prop-types'
import DocumentContext from '../contexts/document'

function Application ({ Component, pageProps }) {
  return (
    <DocumentContext>
     <Component {...pageProps} />
    </DocumentContext>
  )
}

Application.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default Application
