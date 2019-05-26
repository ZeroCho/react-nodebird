import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) => {
  const { post } = useSelector(state => state.post);
  return (
    <>
      <Helmet
        title={`${post.User.nickname}님의 게시글`}
        description={post.content}
        meta={[{
          name: 'description', content: post.content,
        }, {
          property: 'og:description', content: post.content,
        }, {
          property: 'og:image', content: post.Images[0] && `http://localhost:3065/${post.Images[0].src}`,
        }, {
          property: 'og:title', content: `${post.User.nickname}님의 게시글`,
        }, {
          property: 'og:url', content: `http://localhost:3060/post/${id}`,
        }]}
      />
      <div>
        {post.content}
        {post.User.nickname}
        {post.Images[0] && <img src={`http://localhost:3065/${post.Images[0].src}`} />}
      </div>
    </>
  );
};

Post.getInitialProps = async (context) => {
  console.log(context.query.id);
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Post;
