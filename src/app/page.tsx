import PostList from '@/components/PostList';
import { getPosts } from '@/utils/fetch';

export default async function Home() {
  const posts = await getPosts({});
  return <PostList initalPosts={posts} />;
}
