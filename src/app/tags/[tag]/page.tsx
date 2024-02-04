import PostList from '@/components/PostList';
import { getPosts, getTags } from '@/utils/fetch';
import { Metadata } from 'next';

type TagPageProps = {
  params: { tag: string };
};

export const generateMetadata = ({ params }: TagPageProps): Metadata => {
  return {
    title: `장동훈의 블로그 - #${decodeURIComponent(params.tag)}`,
    description: '개발 관련 이야기를 나누는 블로그입니다.',
  };
};

export const generateStaticParams = async () => {
  const tags = await getTags();
  return tags.map((tag) => ({ tag }));
};

export default async function TagPosts({
  params,
}: {
  params: { tag: string };
}) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPosts({ tag });

  return <PostList tag={tag} initalPosts={posts} />;
}
