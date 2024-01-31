import PostList from '@/components/PostList';
import { getPosts, getTags } from '@/utils/fetch';

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
