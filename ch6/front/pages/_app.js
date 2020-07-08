import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component />
  </>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
