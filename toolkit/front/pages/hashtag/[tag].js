import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import { loadMyInfo } from '../../actions/user';
import { loadHashtagPosts } from '../../actions/post';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    const onScroll = () => {
      if (hasMorePosts && !loadPostsLoading) {
        if ((window.pageYOffset + document.documentElement.clientHeight)
          > (document.documentElement.scrollHeight - 300)) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadHashtagPosts({
            lastId,
            hashtag: tag,
          }));
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await context.store.dispatch(loadHashtagPosts({ hashtag: context.params.tag }));
  await context.store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

export default Hashtag;
