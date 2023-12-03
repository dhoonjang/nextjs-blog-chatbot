import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const supabase = createClient();

export default function Tag() {
  const { data: existingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags');
      return Array.from(new Set(data?.flatMap((d) => JSON.parse(d.tags))));
    },
  });

  return (
    <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="container mx-auto flex flex-wrap justify-center gap-2 px-10">
        {existingTags?.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className="text-xl text-gray-500 underline hover:text-gray-700"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
