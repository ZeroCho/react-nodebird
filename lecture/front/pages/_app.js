import Head from 'next/head';
import App, { Container } from 'next/app';
import { applyMiddleware, compose, createStore } from 'redux';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';

import AppLayout from '../containers/AppLayout';
import sagaMiddleware from '../sagas/middleware';
import reducer from '../reducers';
import rootSaga from '../sagas';

class NodeBird extends App {
  static propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object,
    pageProps: PropTypes.object,
  };

  static getInitialProps = async (context) => {
    let pageProps = {};
    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }
    return { pageProps };
  };

  render() {
    const { store, pageProps, Component } = this.props;
    console.log(Component);
    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title>NodeBird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
          </Head>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux((initialState, options) => {
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'development'
    ? compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f,
    )
    : compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();
  return store;
})(withReduxSaga(NodeBird));

