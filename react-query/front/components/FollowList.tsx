import React, { VFC } from 'react';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { removeFollowerAPI, unfollowAPI } from '../apis/user';
import User from '../interfaces/user';

interface Props {
  header: string;
  data: User[];
  onClickMore: () => void;
  loading: boolean;
  hasNext: boolean;
}
const FollowList: VFC<Props> = ({ hasNext, header, data, onClickMore, loading }) => {
  const onCancel = (id: number) => () => {
    if (header === '팔로잉') {
      unfollowAPI(id);
    }
    removeFollowerAPI(id);
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        hasNext ? (
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <Button onClick={onClickMore} loading={loading}>
              더 보기
            </Button>
          </div>
        ) : null
      }
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

export default FollowList;
