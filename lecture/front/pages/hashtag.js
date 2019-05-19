import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';

const Hashtag = ({ tagName }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    console.log(window.scrollY, document.documentElement.clientHeight, window.scrollY + document.documentElement.clientHeight, document.documentElement.scrollHeight);
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      console.log(mainPosts, mainPosts[mainPosts.length - 1]);
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          data: tagName,
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
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.getInitialProps = async (context) => {
  const tagName = context.query.tag;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tagName,
  });
  return { tagName };
};

Hashtag.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export default Hashtag;
