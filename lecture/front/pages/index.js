import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import PostForm from '../containers/PostForm';

const Home = () => {
  const mainPosts = useSelector(state => state.post.mainPosts);
  const hasMorePost = useSelector(state => state.post.hasMorePost);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onScroll = useCallback(() => {
    console.log(window.scrollY, document.documentElement.clientHeight, window.scrollY + document.documentElement.clientHeight, document.documentElement.scrollHeight);
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      console.log(mainPosts, mainPosts[mainPosts.length - 1]);
      if (hasMorePost) {
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          lastId: mainPosts[mainPosts.length - 1].id,
        });
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
