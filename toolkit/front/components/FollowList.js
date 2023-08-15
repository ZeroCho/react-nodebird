import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { unfollow, removeFollower } from '../reducers/user';

function FollowList({ header, data, onClickMore, loading }) {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch(unfollow(id));
    }
    dispatch(removeFollower(id));
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
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
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
FollowList.defaultProps = {
  data: [],
};

export default FollowList;
