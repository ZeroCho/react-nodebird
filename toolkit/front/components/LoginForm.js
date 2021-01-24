import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';
import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '../actions/user';

const FormWrapper = styled(Form)`
  padding: 10px;
  box-sizing: border-box;
`;

const LoginFormSchema = Yup.object().shape({
  user_email: Yup.string()
    .email('올바르지 않은 이메일 형식 입니다.')
    .required('이메일은 필수 입력 항목 입니다.'),
  user_password: Yup.string()
    .required('비밀번호는 필수 입력 항목 입니다.'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { loginLoading, loginError } = useSelector((state) => state.user);

  useEffect(() => {
    if (action) {
      if (loginError) {
        message.error(JSON.stringify(loginError, null, 4)).then();
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [loginError]);

  return (
    <Formik
      initialValues={{
        user_email: '',
        user_password: '',
      }}
      validationSchema={LoginFormSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(login({
          email: values.user_email,
          password: values.user_password,
        }));
        setAction({ setSubmitting, resetForm });
      }}
    >
      <FormWrapper>
        <Form.Item name="user_email">
          <Input
            name="user_email"
            type="email"
            placeholder="User Email"
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item name="user_password">
          <Input.Password
            name="user_password"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item name="submit">
          <Button block type="primary" htmlType="submit" loading={loginLoading}>
            <LoginOutlined /> Log in
          </Button>
          Or <Link href="/signup"><a>register now!</a></Link>
        </Form.Item>
      </FormWrapper>
    </Formik>
  );
};
export default LoginForm;
