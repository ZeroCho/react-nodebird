import { Button, Card, Form, Input, List, Icon } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_FOLLOW_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
// TODO: 절대로 다른 pages import하면 안 됨 알리기

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followingList, followerList } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  useEffect(() => {
    if (me && me.id) {
      dispatch({
        type: LOAD_FOLLOW_REQUEST,
        data: me.id,
      });
    }
  }, [me.id]);

  useEffect(() => {
    if (me && me.id) {
      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: me.id,
      });
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

  return (
    <div>
      <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
        <Input value={me.name} addonBefore="닉네임" />
        <Button type="primary">수정</Button>
      </Form>
      <List
        style={{ marginBottom: 20 }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
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
        loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
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

export default Profile;
