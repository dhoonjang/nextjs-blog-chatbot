import PostList from '@/components/PostList';
import { GetStaticPaths, GetStaticProps } from 'next';

type TagPostsrops = {
  tag: string;
};

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  return {
    props: {
      tag: context.params?.tag as string,
    },
  };
}) satisfies GetStaticProps<TagPostsrops>;

export default function TagPosts({ tag }: TagPostsrops) {
  return <PostList tag={tag} />;
}
