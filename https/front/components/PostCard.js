import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input } from 'antd';
import {
  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST, REPORT_POST_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';
import useInput from '../hooks/useInput';

const { TextArea } = Input;
moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportText, onChangeReportText] = useInput('');
  const [editMode, setEditMode] = useState(false);
  const removePostLoading = useSelector((state) => state.post.removePostLoading);
  const reportPostLoading = useSelector((state) => state.post.reportPostLoading);
  const reportPostDone = useSelector((state) => state.post.reportPostDone);
  const reportPostError = useSelector((state) => state.post.reportPostError);
  const id = useSelector((state) => state.user.me?.id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
      },
    });
  }, [post]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onClickReport = useCallback(() => {
    console.log('신고', post.id);
    setModalVisible(true);
  });

  const onCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSubmitReport = useCallback(() => {
    console.log(id, post.id, reportText);
    dispatch({
      type: REPORT_POST_REQUEST,
      data: {
        postId: post.id,
        content: reportText,
      },
    });
  }, [reportText]);

  useEffect(() => {
    if (reportPostDone) {
      setModalVisible(false);
    }
    if (reportPostError) {
      setModalVisible(false);
    }
  }, [reportPostDone, reportPostError]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button onClick={onClickReport}>신고</Button>}
              </Button.Group>
          )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        <Modal
          title="신고하기"
          visible={modalVisible}
          onOk={onSubmitReport}
          confirmLoading={reportPostLoading}
          onCancel={onCloseModal}
        >
          <form>
            <TextArea value={reportText} onChange={onChangeReportText} />
          </form>
        </Modal>
        {post.RetweetId && post.Retweet
          ? (
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={(
                  <Link href={`/user/${post.User.id}`} prefetch={false}>
                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.User.nickname}
                description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
              />
            </>
          )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
