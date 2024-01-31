import PostList from '@/components/PostList';
import { getCategories, getPosts } from '@/utils/fetch';

export const generateStaticParams = async () => {
  const categories = await getCategories();
  return categories.map((category) => ({ category }));
};

export default async function CategoryPosts({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);
  const posts = await getPosts({ category });

  return (
    <PostList category={decodeURIComponent(category)} initalPosts={posts} />
  );
}
