import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import React from 'react';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => (
  <List
    style={{ marginBottom: '20px' }}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button>더 보기</Button></div>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ marginTop: '20px' }}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
