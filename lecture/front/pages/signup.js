import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import React, { useCallback, useState, useEffect } from 'react';
import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUp = () => {
  const [idDuplicated, setIdDuplicated] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { signedUp, signUpErrorReason, isSigningUp, me } = useSelector(state => state.user);

  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me) {
      Router.push('/');
    }
  }, [me]);

  const signUpAttempt = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        id,
        nick,
        password,
      },
    });
  }, [id, nick, password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('submit');
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    signUpAttempt();
  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  return (
    <Form style={{ padding: 10 }} onSubmit={onSubmit}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required onChange={onChangeId} />
        {idDuplicated && <div>아이디가 중복되었습니다.</div>}
      </div>
      <div>
        <label htmlFor="user-nick">닉네임</label>
        <br />
        <Input name="user-nick" required onChange={onChangeNick} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" onChange={onChangePassword} required />
      </div>
      <div>
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <br />
        <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
        {passwordError && <div>비밀번호 확인이 일치하지 않습니다.</div>}
      </div>
      <div>
        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
        {termError && <div>약관에 동의해주세요.</div>}
      </div>
      {signUpErrorReason && <div>{signUpErrorReason}</div>}
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
        {signedUp && <div>가입에 성공했습니다. 로그인해주세요.</div>}
      </div>
    </Form>
  );
};

export default SignUp;
