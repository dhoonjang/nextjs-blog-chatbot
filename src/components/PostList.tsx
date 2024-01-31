'use client';

import { Post } from '@/types';
import { getPosts } from '@/utils/fetch';
import { cn } from '@/utils/style';
import { createClient } from '@/utils/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';

const supabase = createClient();

type PostListProps = {
  category?: string;
  tag?: string;
  className?: string;
  initalPosts?: Post[];
};

const PostList: FC<PostListProps> = ({
  category,
  tag,
  className,
  initalPosts,
}) => {
  const { ref, inView } = useInView();

  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', category, tag],
    queryFn: async ({ pageParam }) => {
      const posts = await getPosts({ category, tag, page: pageParam });
      if (!posts)
        return {
          posts: [],
          nextPage: null,
        };
      return {
        posts,
        nextPage: posts.length === 5 ? pageParam + 5 : null,
      };
    },
    initialData: !!initalPosts
      ? {
          pages: [
            {
              posts: initalPosts,
              nextPage: initalPosts.length === 5 ? 5 : null,
            },
          ],
          pageParams: [0],
        }
      : undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className={cn('flex flex-col items-center gap-8 pt-20', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="container grid grid-cols-2 gap-x-4 gap-y-6 pb-24 lg:gap-x-7 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default PostList;
