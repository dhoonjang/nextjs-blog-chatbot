import { getTags } from '@/utils/fetch';
import Link from 'next/link';

export default async function Tag() {
  const tags = await getTags();

  return (
    <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="container flex flex-wrap justify-center gap-2">
        {tags?.map((tag) => (
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
