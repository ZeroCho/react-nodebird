import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/');
    }
  }, [isLoggedIn])

  const followerList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];
  const followingList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        data={followingList}
      />
      <FollowList
        header="팔로워 목록"
        data={followerList}
      />
    </AppLayout>
  );
};

export default Profile;
