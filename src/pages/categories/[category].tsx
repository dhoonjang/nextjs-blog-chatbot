import PostList from '@/components/PostList';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type CategoryPostsProps = {
  category: string;
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
      category: context.params?.category as string,
    },
  };
}) satisfies GetStaticProps<CategoryPostsProps>;

export default function CategoryPosts({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList category={category} />;
}
