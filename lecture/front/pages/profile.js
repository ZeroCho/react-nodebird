import { Button, Card, Form, Input, List, Icon } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { LOAD_FOLLOW_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const dummyUser = {
  name: '제로초',
};

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followingList, followerList } = useSelector(state => state.user);

  useEffect(() => {
    if (me && me.id) {
      dispatch({
        type: LOAD_FOLLOW_REQUEST,
        data: me.id,
      });
    }
  }, [me]);

  const onRemoveFollower = useCallback((id) => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  }, []);

  const onUnfollow = useCallback((id) => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: id,
    });
  }, []);

  return (
    <div>
      <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
        <Input value={dummyUser.name} addonBefore="닉네임" />
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
    </div>
  );
};

export default Profile;
