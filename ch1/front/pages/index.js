import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => (
  <AppLayout>
    <Head>
      <title>NodeBird</title>
    </Head>
    <div>Hello, Next!</div>
  </AppLayout>
);

export default Home;
