import {Button, Card, Form, Input, List, Icon} from 'antd';

const dummyUser = {
  name: '제로초',
};

const Profile = () => {
  return (
    <div>
      <Form style={{marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
        <Input value={dummyUser.name} addonBefore="닉네임"/>
        <Button type="primary">수정</Button>
      </Form>
      <List
        style={{marginBottom: 20}}
        grid={{gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
        bordered
        dataSource={['제로초', '바보', '노드버드오피셜']}
        renderItem={item => (<List.Item style={{ marginTop: 20 }}>
          <Card actions={[<Icon type="stop" />]}><Card.Meta description={item}/></Card>
        </List.Item>)}
      />
      <List
        style={{marginBottom: 20}}
        grid={{gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
        bordered
        dataSource={['제로초', '바보', '노드버드오피셜']}
        renderItem={item => (<List.Item style={{ marginTop: 20 }}>
          <Card actions={[<Icon type="stop" />]}><Card.Meta description={item}/></Card>
        </List.Item>)}
      />
    </div>
  );
};

export default Profile;
