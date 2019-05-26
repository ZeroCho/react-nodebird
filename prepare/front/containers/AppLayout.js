import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Input, Menu, Row } from 'antd';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import LoginForm from './LoginForm';
import { LOG_OUT_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
  const [, setCurrentMenu] = useState('home');
  const { me, isLoggingOut } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };

  const onLogOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };

  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  return (
    <div>
      <Menu onClick={handleMenuClick} selectedKeys={[Router.router && Router.router.route]} mode="horizontal">
        <Menu.Item key="/"><Link href="/"><a>노드버드</a></Link></Menu.Item>
        <Menu.Item key="/profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
        <Menu.Item key="mail" disabled>
          <Input.Search
            style={{ verticalAlign: 'middle' }}
            onSearch={onSearch}
            enterButton
          />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? (
              <Card
                actions={[
                  <Link href="/profile" key="twit">
                    <a>
                      <div>
                        짹짹
                        <br />
                        {me.Post.length}
                      </div>
                    </a>
                  </Link>,
                  <Link href="/profile" key="following">
                    <a>
                      <div>
                        팔로잉
                        <br />
                        {me.Followings.length}
                      </div>
                    </a>
                  </Link>,
                  <Link href="/profile" key="follower">
                    <a>
                      <div>
                        팔로워
                        <br />
                        {me.Followers.length}
                      </div>
                    </a>
                  </Link>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar>{me.nickname[0]}</Avatar>}
                  title={me.nickname}
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
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
