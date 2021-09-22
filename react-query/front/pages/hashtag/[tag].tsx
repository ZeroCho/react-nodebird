// hashtag/[tag].js
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';

import { loadHashtagPostsAPI } from '../../apis/post';
import Post from '../../interfaces/post';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';

const Hashtag = () => {
  const [ref, inView] = useInView();
  const router = useRouter();
  const { tag } = router.query;

  const {
    data,
    isLoading: loadPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery<Post[]>(
    ['hashtag', tag],
    ({ pageParam = '' }) => loadHashtagPostsAPI(tag as string, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
    },
  );

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
      {mainPosts?.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div ref={readToLoad ? ref : undefined} style={{ height: 50, backgroundColor: 'yellow' }} />
    </AppLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();
  const tag = context.params?.tag as string;
  if (!tag) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  await queryClient.prefetchInfiniteQuery(['hashtag', tag], () => loadHashtagPostsAPI(tag));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Hashtag;
