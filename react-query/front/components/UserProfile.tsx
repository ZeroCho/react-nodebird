import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { loadMyInfoAPI, logOutAPI } from '../apis/user';

import User from '../interfaces/user';

const UserProfile = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const mutation = useMutation<void, AxiosError>(logOutAPI, {
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: () => {
      queryClient.setQueryData('user', null);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onLogOut = useCallback(() => {
    console.log('logout mutate');
    mutation.mutate();
  }, [mutation]);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me?.id}`}>
            <a>
              짹짹
              <br />
              {me?.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me?.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me?.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me?.id}`} prefetch={false}>
            <a>
              <Avatar>{me?.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me?.nickname}
      />
      <Button onClick={onLogOut} loading={loading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
