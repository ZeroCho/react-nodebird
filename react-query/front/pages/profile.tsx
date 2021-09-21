import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios, { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';

import { loadFollowersAPI, loadFollowingsAPI, loadMyInfoAPI } from '../apis/user';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import User from '../interfaces/user';

const Profile = () => {
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const {
    data: followings,
    isLoading: followingsLoading,
    error: followingsError,
    fetchNextPage: fetchNextFollowings,
    hasNextPage: hasNextFollowings,
  } = useInfiniteQuery<User[], AxiosError>('followings', ({ pageParam = 0 }) => loadFollowingsAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 3) return;
      return pages.length;
    },
  });
  const {
    data: followers,
    isLoading: followersLoading,
    error: followersError,
    fetchNextPage: fetchNextFollowers,
    hasNextPage: hasNextFollowers,
  } = useInfiniteQuery<User[], AxiosError>('followers', ({ pageParam = 0 }) => loadFollowersAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 3) return;
      return pages.length;
    },
  });
  const followersData = followers?.pages.flat() || [];
  const followingsData = followings?.pages.flat() || [];

  useEffect(() => {
    if (!me?.id) {
      Router.push('/');
    }
  }, [me]);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followersError || followingsError) {
    console.error(followersError?.response?.data || followingsError?.response?.data);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉"
          data={followingsData}
          onClickMore={fetchNextFollowings}
          loading={followingsLoading}
          hasNext={hasNextFollowings || false}
        />
        <FollowList
          header="팔로워"
          data={followersData}
          onClickMore={fetchNextFollowers}
          loading={followersLoading}
          hasNext={hasNextFollowers || false}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const data = await loadMyInfoAPI();
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Profile;
