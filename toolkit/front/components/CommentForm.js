import React, { useState, useEffect } from 'react';
import {
  Button, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { addComment } from '../actions/post';

const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .min(3, '답글은 3자 이상 입력하여 주십시오.')
    .required('답글은 필수 입력 항목 입니다.'),
});

const CommentForm = ({ post }) => {
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone, addCommentError } = useSelector((state) => state.post);

  useEffect(() => {
    if (action) {
      if (addCommentDone) {
        message.success('댓글이 등록되었습니다.').then();
      }
      if (addCommentError) {
        message.error(JSON.stringify(addCommentError, null, 4)).then();
      }
      action.setSubmitting(false);
      action.resetForm();
      setAction(null);
    }
  }, [addCommentDone, addCommentError]);

  return (
    <Formik
      initialValues={{
        content: '',
      }}
      validationSchema={CommentSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(addComment({
          postId: post.id,
          userId: id,
          ...values,
        }));
        setAction({ setSubmitting, resetForm });
      }}
    >
      <Form>
        <Form.Item name="content">
          <Input.TextArea
            name="content"
            maxLength={50}
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder="어떤 신기한 일이 있었나요?"
          />
        </Form.Item>
        <div style={{ position: 'relative', margin: 0 }}>
          <Button
            style={{ position: 'absolute', right: 0, top: '-15px', zIndex: 1 }}
            type="primary"
            htmlType="submit"
            loading={addCommentLoading}
          >
            댓글달기
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    Comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })),
    Images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })),
    Likers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
};

export default CommentForm;
