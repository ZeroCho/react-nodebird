import { Button, Form, Input } from 'antd';
import React from 'react';

const NicknameEditForm = () => {
  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input addonBefore="닉네임" />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NicknameEditForm;
