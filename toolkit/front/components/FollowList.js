import React from 'react';
import ProTypes from 'prop-types';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeFollow, unfollow } from '../actions/user';

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const onCancel = (userId) => () => {
    if (header === '팔로잉') {
      dispatch(unfollow({
        userId,
      }));
    } else {
      dispatch(removeFollow({
        userId,
      }));
    }
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{
        gutter: 4, xs: 2, md: 3,
      }}
      size="small"
      header={<div>{header}</div>}
      loadMore={(
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>더 보기</Button>
        </div>
      )}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};
FollowList.propTypes = {
  header: ProTypes.string.isRequired,
  data: ProTypes.array.isRequired,
  onClickMore: ProTypes.func.isRequired,
  loading: ProTypes.bool.isRequired,
};

export default FollowList;
