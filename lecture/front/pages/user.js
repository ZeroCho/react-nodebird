import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Card } from 'antd';

import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';
import { LOAD_USER_REQUEST } from '../reducers/user';
// TODO: 절대로 다른 pages import하면 안 됨 알리기

const User = ({ userId }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: userId,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: userId,
    });
  }, []);

  return (
    <div>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Post}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      <div>
        {mainPosts.map(c => (
          <PostCard key={+new Date(c.createdAt)} post={c} />
        ))}
      </div>
    </div>
  );
};

User.getInitialProps = async (context) => {
  return { userId: parseInt(context.query.id, 10) };
};

User.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default User;
