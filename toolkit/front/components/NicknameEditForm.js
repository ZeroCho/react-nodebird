import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, message } from 'antd';
import { changeNickname } from '../actions/user';

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-sizing: border-box;
`;

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me,
    changeNicknameLoading,
    changeNicknameDone,
    changeNicknameError,
  } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState('');
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, [nickname]);

  useEffect(() => {
    if (nickname) {
      if (changeNicknameDone) {
        message.success('닉네임이 변경 되었습니다.').then();
      }
      if (changeNicknameError) {
        message.error(JSON.stringify(changeNicknameError, null, 4)).then();
      }
    }
  }, [changeNicknameDone, changeNicknameError]);

  const onSubmit = useCallback(() => {
    dispatch(changeNickname({
      nickname,
    }));
  }, [nickname]);
  return (
    <FormWrapper>
      <Form.Item name="nickname">
        <Input.Search
          name="nickname"
          placeholder={me.nickname}
          addonBefore="닉네임"
          enterButton="수정"
          value={nickname}
          onChange={onChangeNickname}
          onSearch={onSubmit}
          loading={changeNicknameLoading}
        />
      </Form.Item>
    </FormWrapper>
  );
};

export default NicknameEditForm;
