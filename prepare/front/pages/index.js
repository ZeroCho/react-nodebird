import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import PostForm from '../containers/PostForm';

const Home = () => {
  const mainPosts = useSelector(state => state.post.mainPosts);
  const hasMorePost = useSelector(state => state.post.hasMorePost);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
            date: +new Date(),
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [mainPosts.length, hasMorePost]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {me && (
        <PostForm />
      )}
      {mainPosts.map(c => (
        <PostCard key={c.createdAt + c.User.id} post={c} />
      ))}
    </div>
  );
};

Home.getInitialProps = async (context) => {
  console.log('home getInitialProps', Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
