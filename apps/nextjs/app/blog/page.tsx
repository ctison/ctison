import type { Metadata } from 'next';
import { getPosts } from './_lib/posts';
import { BlogList } from './_ui/BlogList';

export const metadata: Metadata = {
  title: 'Blog · @ctison.dev',
  description: 'Engineering notes, design experiments, and longer thoughts.',
};

// Blog index: loads all posts (newest-first) and renders the searchable list.
export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className='mx-auto w-full max-w-5xl flex-1 px-6 py-16'>
      <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>Blog</h1>
      <p className='mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400'>
        Engineering notes, design experiments, and the occasional longer thought.
      </p>
      <BlogList posts={posts} />
    </main>
  );
}
