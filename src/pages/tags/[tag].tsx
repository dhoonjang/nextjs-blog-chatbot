import PostList from '@/components/PostList';
import { GetServerSideProps } from 'next';

type TagPostsrops = {
  tag: string;
};

export default function TagPosts({ tag }: TagPostsrops) {
  return <PostList tag={tag} />;
}

export const getServerSideProps: GetServerSideProps<TagPostsrops> = async ({
  query,
}) => {
  return {
    props: {
      tag: query.tag as string,
    },
  };
};
