// hashtag/[tag].js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useInView } from 'react-intersection-observer';

import axios from 'axios';
import { LOAD_HASHTAG_POSTS_REQUEST, LOAD_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import AppLayout from '../../components/AppLayout';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(
    () => {
      if (inView && hasMorePosts && !loadPostsLoading) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
          data: tag,
        });
      }
    },
    [inView, hasMorePosts, loadPostsLoading, mainPosts, tag],
  );

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: params.tag,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Hashtag;
