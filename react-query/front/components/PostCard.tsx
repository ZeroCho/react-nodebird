import { AxiosError } from 'axios';
import React, { useState, useCallback, VFC } from 'react';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'dayjs';
import { InfiniteData, useMutation, useQuery, useQueryClient } from 'react-query';

import { likePostAPI, removePostAPI, retweetAPI, unlikePostAPI, updatePostAPI } from '../apis/post';
import { loadMyInfoAPI } from '../apis/user';
import Post from '../interfaces/post';
import User from '../interfaces/user';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

moment.locale('ko');

const PostCard: VFC<{ post: Post }> = ({ post }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const [editMode, setEditMode] = useState(false);
  const likeMutation = useMutation<Post, AxiosError, number>(['post', post.id], likePostAPI, {
    onMutate() {
      if (!me) return;
      queryClient.setQueryData<InfiniteData<Post[]>>('posts', (data) => {
        const found = data?.pages.flat().find((v) => v.id === post.id);
        if (found) {
          found.Likers.push({ id: me.id });
        }
        return {
          pageParams: data?.pageParams || [],
          pages: data?.pages || [],
        };
      });
    },
    onSettled() {
      queryClient.refetchQueries('posts');
    },
  });
  const unlikeMutation = useMutation<Post, AxiosError, number>(['post', post.id], unlikePostAPI, {
    onMutate() {
      if (!me) return;
      queryClient.setQueryData<InfiniteData<Post[]>>('posts', (data) => {
        const found = data?.pages.flat().find((v) => v.id === post.id);
        if (found) {
          const index = found.Likers.findIndex((v) => v.id === me.id);
          found.Likers.splice(index, 1);
        }
        return {
          pageParams: data?.pageParams || [],
          pages: data?.pages || [],
        };
      });
    },
    onSettled() {
      queryClient.refetchQueries('posts');
    },
  });

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => {
      return updatePostAPI({
        PostId: post.id,
        content: editText,
      });
    },
    [post],
  );

  const onLike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    likeMutation.mutate(post.id);
  }, [me, post.id, likeMutation]);

  const onUnlike = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    unlikeMutation.mutate(post.id);
  }, [me, post.id, unlikeMutation]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    setLoading(true);
    removePostAPI(post.id).finally(() => {
      setLoading(false);
    });
  }, [me?.id, post.id]);
  //
  const onRetweet = useCallback(() => {
    if (!me?.id) {
      return alert('로그인이 필요합니다.');
    }
    retweetAPI(post.id).catch((error) => {
      alert(error.response.data);
    });
  }, [me?.id, post.id]);

  const liked = post.Likers.find((v) => me?.id && v.id === me.id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {me?.id && post.User.id === me.id ? (
                  <>
                    {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                    <Button danger loading={loading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={me?.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname?.[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname?.[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                  postData={post.content}
                />
              }
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
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User.nickname?.[0]}</Avatar>
                      </a>
                    </Link>
                  }
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

export default PostCard;
