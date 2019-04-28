import React, { useEffect } from 'react';
import { Avatar, Card, Col, Input, Menu, Row, Button } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from '../reducers/user';

const dummyUser = {
  name: '제로초',
};

const AppLayout = ({ children }) => {
  const [currentMenu, setCurrentMenu] = useState('home');
  const { user, isLoggingOut } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: LOAD_USER_REQUEST });
    }
  }, []);

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };

  const onLogOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
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
        {user
          ? (
            <Card
              actions={[
                <div key="twit">짹짹<br />3개</div>,
                <div key="following">팔로잉<br />0명</div>,
                <div key="follower">팔로워<br />1억명</div>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar>{dummyUser.name[0]}</Avatar>}
                title={dummyUser.name}
              />
              <Button loading={isLoggingOut} onClick={onLogOut}>로그아웃</Button>
            </Card>
          )
          : <LoginForm />
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
