import PostList from '@/components/PostList';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const generateStaticParams = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('tags');
  const tags = Array.from(new Set(data?.flatMap((d) => JSON.parse(d.tags))));
  return tags.map((tag) => ({ tag }));
};

export default async function TagPosts({
  params,
}: {
  params: { tag: string };
}) {
  const supabase = createClient(cookies());
  const tag = params.tag;
  const { data } = await supabase
    .from('Post')
    .select('*')
    .like('tags', `%${tag}%`);

  return (
    <PostList
      tag={decodeURIComponent(tag)}
      initalPosts={data?.map((post) => ({
        ...post,
        tags: JSON.parse(post.tags) as string[],
      }))}
    />
  );
}
