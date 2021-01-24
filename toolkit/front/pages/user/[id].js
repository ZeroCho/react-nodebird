import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { loadUserPosts } from '../../actions/post';
import { loadMyInfo, loadUser } from '../../actions/user';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if ((window.pageYOffset + document.documentElement.clientHeight)
          > (document.documentElement.scrollHeight - 300)) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadUserPosts({
            lastId,
            userId: id,
          }));
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
          <meta property="og:url" content={`https://sorayeon.shop/post/${id}`} />
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://sorayeon.shop/favicon.ico" />
          <meta property="og:url" content={`https://sorayeon.shop/user/${id}/posts`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <div style={{ padding: 15, background: '#ececec', marginBottom: 20 }}>
            <Card
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
                avatar={(
                  <Link href={`/user/${userInfo.id}`}>
                    <a><Avatar>{userInfo.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={userInfo.nickname}
              />
            </Card>
          </div>
        )
        : null}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadUserPosts({ userId: context.params.id }));
  await context.store.dispatch(loadUser({ userId: context.params.id }));
  await context.store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

export default User;
