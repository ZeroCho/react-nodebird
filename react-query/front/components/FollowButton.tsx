import React, { useCallback, useState, VFC } from 'react';
import { Button } from 'antd';
import { useQuery } from 'react-query';

import { followAPI, loadMyInfoAPI, unfollowAPI } from '../apis/user';
import Post from '../interfaces/post';
import User from '../interfaces/user';

const FollowButton: VFC<{ post: Post }> = ({ post }) => {
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const [loading, setLoading] = useState(false);
  const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    setLoading(true);
    if (isFollowing) {
      unfollowAPI(post.User.id).finally(() => {
        setLoading(false);
      });
    } else {
      followAPI(post.User.id).finally(() => {
        setLoading(false);
      });
    }
  }, [post.User.id, isFollowing]);

  if (post.User.id === me?.id) {
    return null;
  }
  return (
    <Button loading={loading} onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
