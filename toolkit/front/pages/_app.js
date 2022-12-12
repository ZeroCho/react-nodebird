import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import store from '../store/configureStore';

const NodeBird = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird</title>
    </Head>
    <Component {...pageProps} />
  </Provider>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default NodeBird;
