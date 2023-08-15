import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NodeBird({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default NodeBird;
