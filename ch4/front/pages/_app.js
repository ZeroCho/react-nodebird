import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(withReduxSaga(NodeBird));
