import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';

import { changeNicknameAPI, loadMyInfoAPI } from '../apis/user';
import useInput from '../hooks/useInput';
import User from '../interfaces/user';

const NicknameEditForm = () => {
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    changeNicknameAPI(nickname);
  }, [nickname]);

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
