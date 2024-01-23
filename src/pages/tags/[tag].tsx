import PostList from '@/components/PostList';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { GetStaticPaths, GetStaticProps } from 'next';

type TagPostsrops = {
  tag: string;
  posts: Post[];
};

const supabase = createClient({});

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('tags');
  const tags = Array.from(new Set(data?.flatMap((d) => JSON.parse(d.tags))));
  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const tag = context.params?.tag as string;
  const { data } = await supabase
    .from('Post')
    .select('*')
    .like('tags', `%${tag}%`);

  return {
    props: {
      tag,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  };
}) satisfies GetStaticProps<TagPostsrops>;

export default function TagPosts({ tag }: TagPostsrops) {
  return <PostList tag={tag} />;
}
