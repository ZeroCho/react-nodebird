// 페이지의 공통되는 것들을 처리할 수 있다.
import React from "react";
import "antd/dist/antd.css";
import Head from "next/head";

const App = ({ Component }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </div>
  );
};

export default App;
