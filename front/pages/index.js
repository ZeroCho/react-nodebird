import { Card, Icon, Avatar, Input, Button, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const dummy = [{
  img: null,
  User: {
    name: '제로초',
  },
  content: '#졸리다 #하아아암',
  createdAt: new Date(),
}, {
  img: 'https://pbs.twimg.com/media/D343EC-WwAEwh-B.jpg',
  User: {
    name: '제로초',
  },
  content: '@제로초 졸리다 #하아아암 zerocho.com',
  createdAt: new Date(),
}];

const Home = () => {
  const { mainPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  };

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  return (
    <div>
      <Form style={{ marginBottom: 20 }} encType="multipart/form-data" onSubmit={onSubmitPost}>
        <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
        <div>
          <input type="file" hidden />
          <Button>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
        </div>
      </Form>
      {mainPosts.map((c, i) => {
        return (
          <Card
            key={+c.createdAt + i}
            cover={c.img && <img alt="example" src={c.img} />}
            actions={[
              <Icon type="retweet" key="retweet" />,
              <Icon type="heart" key="heart" />,
              <Icon type="message" key="message" />,
              <Icon type="ellipsis" key="ellipsis" />,
            ]}
            style={{ marginBottom: 20 }}
          >
            <Card.Meta
              avatar={<Avatar>{c.user.nickname[0]}</Avatar>}
              title={c.user.nickname}
              description={c.content}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
