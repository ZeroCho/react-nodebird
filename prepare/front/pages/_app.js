import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';

// class NodeBird extends App {
//   static getInitialProps(context) {
//
//   }
//   render() {
//
//   }
// }

const NodeBird = ({ Component, pageProps }) => {
  return (
    <>
      <Helmet
        title="NodeBird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charset: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: '제로초의 NodeBird SNS',
        }, {
          name: 'og:title', content: 'NodeBird',
        }, {
          name: 'og:description', content: '제로초의 NodeBird SNS',
        }, {
          property: 'og:type', content: 'website',
        }, {
          property: 'og:image', content: 'https://nodebird.com/favicon.ico',
        }]}
        link={[{
          rel: 'shortcut icon', href: '/favicon.ico',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
        }]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

export default wrapper.withRedux(NodeBird);
