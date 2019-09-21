import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
        <Link href="/profile" prefetch key="twit">
          <a>
            <div>짹짹<br />{me.Posts.length}</div>
          </a>
        </Link>,
        <Link href="/profile" prefetch key="following">
          <a>
            <div>팔로잉<br />{me.Followings.length}</div>
          </a>
        </Link>,
        <Link href="/profile" prefetch key="follower">
          <a>
            <div>팔로워<br />{me.Followers.length}</div>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
