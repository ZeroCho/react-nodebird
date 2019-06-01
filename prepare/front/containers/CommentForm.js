import { Button, Form, Input } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const { me } = useSelector(state => state.user);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const { commentAdded, isAddingComment } = useSelector(state => state.post);

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  return (
    <Form onSubmit={onSubmitComment}>
      <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
      <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
