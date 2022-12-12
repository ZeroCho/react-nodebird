import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { backUrl } from '../../config/config';
import { initialState as postInitialState, LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { initialState as userInitialState } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { loadUserPostsAPI } from '../../sagas/post';
import { loadMyInfoAPI, loadUserAPI } from '../../sagas/user';

const User = (props) => {
  console.log('user props', props);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <Card
            style={{ marginBottom: 20 }}
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  axios.defaults.baseURL = backUrl;
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const { id } = context.params;
  try {
    const results = await Promise.allSettled([
      loadUserPostsAPI(id), loadMyInfoAPI(), loadUserAPI(id),
    ]);
    console.log(results);
    const [userPosts, myInfo, user] = results.map((result) => result.value.data);
    return {
      props: {
        initialState: {
          user: {
            ...userInitialState,
            me: myInfo,
            userInfo: user,
          },
          post: {
            ...postInitialState,
            mainPosts: userPosts,
            hasMorePosts: userPosts.length === 10,
          },
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'error happened',
      },
    };
  }
}

export default User;
