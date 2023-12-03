import PostCard from '@/components/PostCard';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

export default function Home() {
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .order('created_at', { ascending: false });
      if (!data) return [];
      return data;
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-4 gap-y-6 px-4 pb-24 pt-20 lg:gap-x-7 lg:gap-y-12">
      {posts?.map((post) => <PostCard key={post.id} {...post} />)}
    </div>
  );
}
