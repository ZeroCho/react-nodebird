import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import { loadPostsAPI } from '../apis/post';
import { loadMyInfoAPI } from '../apis/user';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import Post from '../interfaces/post';
import User from '../interfaces/user';

export const getKey = (pageIndex: number, previousPageData: Post[] | null) => {
  // reached the end
  if (previousPageData && !previousPageData.length) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/posts?lastId=0`;

  // add the cursor to the API endpoint
  return `/posts?lastId=${previousPageData?.[previousPageData?.length - 1].id || 0}&limit=10`;
};

const Home = () => {
  const [ref, inView] = useInView();
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery<Post[]>('posts', ({ pageParam = '' }) => loadPostsAPI(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage?.[lastPage.length - 1]?.id;
    },
  });
  console.log('data', data);

  const mainPosts = data?.pages.flat();
  const isEmpty = data?.pages[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.length < 10);
  const hasMorePosts = !isEmpty && !isReachingEnd;
  const readToLoad = hasMorePosts && !loadPostsLoading;

  useEffect(() => {
    console.log('inView!!!', inView);
    if (inView && readToLoad) {
      fetchNextPage();
    }
  }, [inView, readToLoad, fetchNextPage]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={readToLoad ? ref : undefined} style={{ height: 50, backgroundColor: 'yellow' }} />
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('posts', () => loadPostsAPI());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POSTS_REQUEST,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// };

export default Home;
