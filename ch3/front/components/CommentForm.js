import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');

  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
      </Form.Item>
      <Button type="primary" htmlType="submit">삐약</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
