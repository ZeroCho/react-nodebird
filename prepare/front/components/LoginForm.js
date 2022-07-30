import { useCallback, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { Form, Input, Button } from "antd";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-id">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin: 10px 0 0 0;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
