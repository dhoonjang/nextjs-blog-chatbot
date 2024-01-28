import PostPage from '@/components/PostPage';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const generateStaticParams = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('id');
  return data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? [];
};

export default async function Post({ params }: { params: { id: string } }) {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('id', Number(params?.id));

  if (!data || !data[0]) return { notFound: true };

  const { tags, ...rest } = data[0];

  return <PostPage {...rest} tags={JSON.parse(tags) as string[]} />;
}
