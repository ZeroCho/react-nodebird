import { Button, Checkbox, Form, Input } from 'antd';

export default () => {
  return (
    <Form style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required />
      </div>
      <div>
        <label htmlFor="user-nick">닉네임</label>
        <br />
        <Input name="user-nick" required />
      </div>
      <div>
        <label htmlFor="user-pass">비밀번호</label>
        <br />
        <Input name="user-pass" type="password" required />
      </div>
      <div>
        <label htmlFor="user-pass-chk">비밀번호</label>
        <br />
        <Input name="user-pass-chk" type="password" required />
      </div>
      <div>
        <Checkbox name="user-term" required>약관에 동의합니다.</Checkbox>
      </div>
      <div style={{ marginTop: 10 }}>
        <Button type="primary">가입하기</Button>
      </div>
    </Form>
  );
}
