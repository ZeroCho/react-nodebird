import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';

const Hashtag = ({ tagName }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  console.log('Hashtag');
  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tagName,
    });
  }, []);

  return (
    <div>
      {mainPosts.map((c) => {
        return (
          <PostCard key={+c.createdAt} post={c} />
        );
      })}
    </div>
  );
};

Hashtag.getInitialProps = async (context) => {
  return { tagName: context.query.tag };
};

Hashtag.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export default Hashtag;
