import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { logInErrorReason, isLoggingIn } = useSelector(state => state.user);
  const logInAttempt = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        id: userId,
        password,
      }
    });
  }, [userId, password]);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    logInAttempt();
  };

  return (
    <Form style={{ padding: 10 }} onSubmit={onLogin}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={userId} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-pass">비밀번호</label>
        <br />
        <Input name="user-pass" type="password" value={password} required onChange={onChangePassword} />
      </div>
      {logInErrorReason && <div>{logInErrorReason}</div>}
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
        <Link href="/signup">
          <a><Button>회원가입</Button></a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;