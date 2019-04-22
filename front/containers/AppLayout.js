import { Avatar, Button, Card, Col, Form, Input, Menu, Row } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const dummyUser = {
  name: '제로초',
};

const AppLayout = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState('home');
  const user = useSelector(state => state.user);
  console.log(user);
  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };

  return <div>
    <Menu onclick={handleMenuClick} mode="horizontal">
      <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
      <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
      <Menu.Item key="mail" disabled>
        <Input.Search
          style={{ verticalAlign: 'middle' }}
          onSearch={value => console.log(value)}
          enterButton
        />
      </Menu.Item>
    </Menu>
    <Row gutter={8}>
      <Col xs={24} md={6}>
        {user.isLoggedIn
          ? (
            <Card
              actions={[<div>짹짹<br />3개</div>, <div>팔로잉<br />0명</div>, <div>팔로워<br />1억명</div>]}
            >
              <Card.Meta
                avatar={<Avatar>{dummyUser.name[0]}</Avatar>}
                title={dummyUser.name}
              />
            </Card>
          )
          : (
            <Form style={{ padding: 10 }}>
              <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" />
              </div>
              <div>
                <label htmlFor="user-pass">비밀번호</label>
                <br />
                <Input name="user-pass" type="password" />
              </div>
              <div style={{ marginTop: 10 }}>
                <Button type="primary">로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
              </div>
            </Form>
          )
        }
      </Col>
      <Col xs={24} md={12}>
        {children}
      </Col>
      <Col xs={24} md={6}> </Col>
    </Row>
  </div>
};

export default AppLayout;
