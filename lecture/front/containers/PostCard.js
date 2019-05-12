import React, { useState } from 'react';
import { Avatar, Button, Card, Comment, Form, Icon, Input, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import {
  ADD_COMMENT_REQUEST,
  LIKE_POST_REQUEST,
  LOAD_COMMENTS_REQUEST,
  REMOVE_POST_REQUEST, RETWEET_REQUEST,
  UNLIKE_POST_REQUEST
} from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector(state => state.user);
  const liked = me && post.Likers && post.Likers.find((v) => v.id === me.id);
  const dispatch = useDispatch();

  const onFollow = (userId) => () => {
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: userId,
    });
  };

  const onUnfollow = (userId) => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  };

  const onToggleLike = () => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    if (post.Likers && post.Likers.find((v) => v.id === me.id)) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  };

  const onToggleComment = () => {
    setCommentFormOpened((prev) => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
  };

  const onRemovePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  };

  const onRetweet = () => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      }
    });
  };

  const onChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        cover={post.Images[0] && <img alt="example" src={'http://localhost:3065/' + post.Images[0].src} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon type="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" key="heart"
                onClick={onToggleLike} />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {me && post.UserId === me.id
                  ? (<><Button>
                      수정
                    </Button>
                      <Button type="danger" onClick={onRemovePost}>
                        삭제
                      </Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            }
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={
          !me || post.User.id === me.id
            ? null
            : me.Followings && me.Followings.find((v) => v.id === post.User.id)
            ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
            : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
        }
      >
        {post.RetweetId && post.Retweet ? <Card>
          <Card.Meta
            cover={post.Retweet.Images[0] && <img alt="example" src={'http://localhost:3065/' + post.Retweet.Images[0].src} />}
            avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
            title={post.Retweet.User.nickname}
            description={
              <div>
                {post.Retweet.content.split(/(#[^\s]+)/g).map((v) => {
                  if (v.match(/#[^\s]+/)) {
                    return <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}><a>{v}</a></Link>
                  }
                  return v;
                })}
              </div>
            }
          />
        </Card> : <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map((v) => {
                if (v.match(/#[^\s]+/)) {
                  return <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}><a>{v}</a></Link>
                }
                return v;
              })}
            </div>
          }
        />}
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit">삐약</Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} replies`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                  datetime={moment(item.createdAt).subtract(1, 'days').fromNow()}
                />
              </li>
            ))}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }),
};

export default PostCard;
