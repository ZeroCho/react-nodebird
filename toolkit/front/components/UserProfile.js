import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';

import { logout } from '../reducers/user';

function UserProfile() {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit"><Link href={`/user/${me.id}`}>짹짹<br />{me.Posts.length}</Link></div>,
        <div key="followings"><Link href="/profile">팔로잉<br />{me.Followings.length}</Link></div>,
        <div key="followings"><Link href="/profile">팔로워<br />{me.Followers.length}</Link></div>,
      ]}
      extra={<Button key="logout" onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Avatar>{me.nickname[0]}</Avatar>
          </Link>
        )}
        title={me.nickname}
      />
    </Card>
  );
}

export default UserProfile;
