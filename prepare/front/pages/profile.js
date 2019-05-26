import { Button, Card, Form, Input, List, Icon } from 'antd';
import Router from 'next/router';
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  LOAD_FOLLOWER_REQUEST, LOAD_FOLLOWING_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST, EDIT_NICKNAME_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
// TODO: 절대로 다른 pages import하면 안 됨 알리기

const Profile = () => {
  const [editedName, setEditedName] = useState();
  const dispatch = useDispatch();
  const {
    isEditingNickname, me, followingList, followerList, hasMoreFollower, hasMoreFollowing,
  } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    if (!me) {
      alert('로그인이 필요합니다.');
      Router.push('/');
    }
  }, []);

  const onRemoveFollower = useCallback(id => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  }, []);

  const onUnfollow = useCallback(id => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: id,
    });
  }, []);

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWER_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWING_REQUEST,
      offset: followingList.length,
    });
  }, [followingList.length]);

  const onChangeEditedName = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);

  const onEditNickname = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: editedName,
    });
  }, [editedName]);

  if (!me) {
    return null;
  }

  return (
    <div>
      <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }} onSubmit={onEditNickname}>
        <Input value={editedName || me.nickname} addonBefore="닉네임" onChange={onChangeEditedName} />
        <Button type="primary" loading={isEditingNickname} htmlType="submit">수정</Button>
      </Form>
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={hasMoreFollowing && <Button style={{ width: '100%' }} onClick={loadMoreFollowings}>더 보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={hasMoreFollower && <Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더 보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={+new Date(c.createdAt)} post={c} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context) => {
  console.log('profile getInitialProps', Object.keys(context));
  console.log('profile has user?', context.req && context.req.user);
  const state = context.store.getState();
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWER_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  context.store.dispatch({
    type: LOAD_FOLLOWING_REQUEST,
    data: state.user.me && state.user.me.id,
  });
};

export default Profile;
