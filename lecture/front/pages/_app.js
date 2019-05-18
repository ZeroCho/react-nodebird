import Head from 'next/head';
import App, { Container } from 'next/app';
import { applyMiddleware, compose, createStore } from 'redux';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';

import AppLayout from '../containers/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

class NodeBird extends App {
  static propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
  };

  static getInitialProps = async (context) => {
    let pageProps = {};
    console.log('_app getInitialProps', Object.keys(context));
    const { ctx } = context;
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    const { store } = ctx;
    if (ctx.isServer && cookie) {
      axios.defaults.headers.Cookie = cookie; // 프론트 서버에서는 쿠키를 알아서 담지 못하기때문에 넣어주어야 한다.
    }
    const state = ctx.store.getState();
    if (!state.user.me) {
      store.dispatch({ type: LOAD_USER_REQUEST });
    }
    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(ctx);
    }
    return { pageProps };
  };

  render() {
    const { store, pageProps, Component } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Head>
            <title>NodeBird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'development'
    ? compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
    )
    : compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
