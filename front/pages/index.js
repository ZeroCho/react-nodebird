import { Card, Icon, Avatar, Input, Button, Form } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, LOAD_MAIN_POSTS_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';

const Home = () => {
  const { mainPosts, imagePaths } = useSelector(state => state.post);
  const { isLoggedIn, me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const imageInput = useRef();
  const formData = useRef(typeof FormData !== 'undefined' && new FormData());

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    formData.current.append('content', text);
    imagePaths.forEach((i) => {
      formData.current.append('images', i);
    });
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData.current,
    });
  };

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  };

  const onRemoveImage = (i) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index: i,
    });
  };

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

  return (
    <div>
      {isLoggedIn && <Form style={{ marginBottom: 20 }} encType="multipart/form-data" onSubmit={onSubmitPost}>
        <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
        <div>
          <input type="file" ref={imageInput} onChange={onChangeImages} multiple hidden />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
        </div>
        <div>
          {imagePaths.map((v, i) => {
            return (
              <div key={v} style={{ display: 'inline-block' }}>
                <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
                <div>
                  <Button onClick={onRemoveImage(i)}>제거</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Form>}
      {mainPosts.map((c) => {
        return (
          <Card
            key={+c.createdAt}
            cover={c.img && <img alt="example" src={c.img} />}
            actions={[
              <Icon type="retweet" key="retweet" />,
              <Icon type="heart" key="heart" />,
              <Icon type="message" key="message" />,
              <Icon type="ellipsis" key="ellipsis" />,
            ]}
            extra={
              !me || c.User.id === me.id
                ? null
                : me.Followings && me.Followings.find((v) => v.id === c.User.id)
                  ? <Button onClick={onUnfollow(c.User.id)}>언팔로우</Button>
                  : <Button onClick={onFollow(c.User.id)}>팔로우</Button>
            }
            style={{ marginBottom: 20 }}
          >
            <Card.Meta
              avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
              title={c.User.nickname}
              description={c.content}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
