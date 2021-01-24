import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Checkbox, Form, Input } from 'formik-antd';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, message } from 'antd';
import styled from 'styled-components';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router';
import axios from 'axios';
import { loadMyInfo, signup } from '../actions/user';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const SignupSchema = Yup.object().shape({
  user_email: Yup.string()
    .email('올바르지 않은 이메일 형식 입니다.')
    .required('이메일은 필수 입력 항목 입니다.'),
  user_nickname: Yup.string()
    .required('닉네임은 필수 입력 항목 입니다.'),
  user_password: Yup.string()
    .required('비밀번호는 필수 입력 항목 입니다.'),
  user_password_check: Yup.string()
    .oneOf([Yup.ref('user_password')], '비밀번호가 일치 하지 않습니다.')
    .required('비밀번호 체크는 필수 입력 항목 입니다.'),
  user_term: Yup.bool()
    .oneOf([true], '약관에 동의하여 주십시오'),
});
const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-sizing: border-box;
`;
const Signup = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { me, signupLoading, signupDone, signupError } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      message.warn('로그인 한 사용자는 가입하실수 없습니다.').then();
      Router.push('/').then();
    }
  }, [me && me.id]);

  useEffect(() => {
    if (action) {
      if (signupDone) {
        message.success('회원가입에 성공하셨습니다.').then(() => Router.push('/').then());
      }
      if (signupError) {
        message.error(JSON.stringify(signupError, null, 4)).then();
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [signupDone, signupError]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Formik
        initialValues={{
          user_email: '',
          user_nickname: '',
          user_password: '',
          user_password_check: '',
          user_term: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(signup({
            email: values.user_email,
            nickname: values.user_nickname,
            password: values.user_password,
          }));
          setAction({ setSubmitting, resetForm });
        }}
      >
        <FormWrapper layout="vertical">
          <Form.Item
            name="user_email"
            label="이메일"
          >
            <Input
              name="user_email"
              type="email"
              placeholder="User Email"
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="user_nickname"
            label="닉네임"
          >
            <Input
              name="user_nickname"
              placeholder="Nickname"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="user_password"
            label="비밀번호"
          >
            <Input.Password
              name="user_password"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="user_password_check"
            label="비밀번호체크"
          >
            <Input.Password
              name="user_password_check"
              placeholder="Password Check"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item name="user_term">
            <Checkbox
              name="user_term"
              placeholder="user_term Check"
            >
              동의 하시겠습니까?
            </Checkbox>
          </Form.Item>
          <Form.Item name="submit">
            <Button
              type="primary"
              htmlType="submit"
              loading={signupLoading}
            >
              가입하기
            </Button>
          </Form.Item>
        </FormWrapper>
      </Formik>
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadMyInfo());
  return {
    props: {},
  };
});

export default Signup;
