import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { message } from 'antd';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const mainPosts = useSelector((state) => state.post.mainPosts);
  const { hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
  const { reportPostDone, reportPostError } = useSelector((state) => state.post);

  useEffect(() => {
    if (reportPostDone) {
      message.success('신고가 접수되었습니다. 빠른 시일 내에 조치하겠습니다.', 5);
    }
    if (reportPostError) {
      message.error(reportPostError, 5);
    }
  }, [reportPostDone, reportPostError]);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
