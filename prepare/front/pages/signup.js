import React from "react";
import AppLayout from "../components/AppLayout";
import App from "./_app";
import Head from "next/head";

const Signup = () => {
  return (
    <div>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>회원가입 페이지</AppLayout>
    </div>
  );
};

export default Signup;
