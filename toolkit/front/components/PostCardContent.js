import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import PropTypes from 'prop-types';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import { Button, message } from 'antd';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, UndoOutlined } from '@ant-design/icons';
import { updatePost } from '../actions/post';

// 첫 번째 게시글 #해시태그 #익스프레스#안녕
// regexr.com
/*
/#[^\s#]+/g

1. // 사이에 정규표현식을 넣는다
2. 맨 뒤에 g를 붙이면 여러개 전부 선택한다.
3. # 을 선택한다
4. . 한글자
5. + 뒤로 전부 선택
6. [] 안에 들어간것을 선택
7. [^] 안에 ^이 들어가면 들어간것 제외
8. \s 는 공백을 표현
9 #은 #을 연달아 쓰는경우 나누기 위해
*/

const PostCardContentSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, '게시글은 5자 이상 입력하여 주십시오.')
    .required('게시글은 필수 입력 항목 입니다.'),
});

const PostCardContent = ({ postId, postContent, editMode, onToggleChangePost }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { updatePostLoading, updatePostDone, updatePostError } = useSelector((state) => state.post);

  useEffect(() => {
    if (action) {
      if (updatePostDone) {
        message.success('게시글이 수정되었습니다.').then();
      }
      if (updatePostError) {
        message.error(JSON.stringify(updatePostError, null, 4)).then();
      }
      action.setSubmitting(false);
      action.resetForm();
      onToggleChangePost();
      setAction(null);
    }
  }, [updatePostDone, updatePostError]);
  return (
    <div>
      {editMode
        ? (
          <Formik
            initialValues={{ content: postContent }}
            validationSchema={PostCardContentSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(updatePost({
                postId,
                content: values.content,
              }));
              setAction({ setSubmitting, resetForm });
            }}
          >
            <Form style={{ marginBottom: '20px' }}>
              <Form.Item name="content">
                <Input.TextArea
                  name="content"
                  maxLength={140}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder="어떤 신기한 일이 있었나요?"
                />
              </Form.Item>
              <Button.Group>
                <Button
                  htmlType="submit"
                  loading={updatePostLoading}
                >
                  <EditOutlined /> 수정
                </Button>
                <Button type="danger" onClick={onToggleChangePost}>
                  <UndoOutlined /> 취소
                </Button>
              </Button.Group>
            </Form>
          </Formik>
        )
        : postContent
          .split(/(#[^\s#]+)/g)
          .map((v, i) => {
            if (v.match(/(#[^\s#]+)/g)) {
              return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>;
            }
            return v;
          })}
    </div>
  );
};

PostCardContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postContent: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onToggleChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
