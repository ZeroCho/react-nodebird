import { Form, Input, Button } from 'antd';
import React, { useCallback, useState, VFC } from 'react';
import { useQuery } from 'react-query';

import { loadMyInfoAPI } from '../apis/user';
import { addCommentAPI } from '../apis/post';
import useInput from '../hooks/useInput';
import Post from '../interfaces/post';
import User from '../interfaces/user';

const CommentForm: VFC<{ post: Post }> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    if (me) {
      setLoading(true);
      addCommentAPI({ content: commentText, postId: post.id, userId: me.id })
        .then(() => {
          setCommentText('');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [post.id, commentText, me, setCommentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
