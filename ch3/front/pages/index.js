import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  useEffect(() => { // TODO: 액션 예시를 보여주기 위해 썼으니 제거
    dispatch(loginAction);
    dispatch(logoutAction);
    dispatch(loginAction);
  }, []);

  return (
    <div>
      {user ? <div>로그인 했습니다: { user.nickname }</div> : <div>로그아웃 했습니다.</div>}
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        );
      })}
    </div>
  );
};

export default Home;
