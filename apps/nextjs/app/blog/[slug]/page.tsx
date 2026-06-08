import type { Metadata } from 'next';
import { getPostSlugs } from '../_lib/posts';

// Only render slugs known at build time; unknown ones fall through to not-found.
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

// Formats an ISO date into a short, readable label for the post header.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Pre-renders every post at build time.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Derives per-post <head> metadata from the post's exported metadata.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/blog/_posts/${slug}.mdx`);
  return {
    title: `${metadata.title} · @ctison.dev`,
    description: metadata.description,
  };
}

// Renders a single MDX post inside a prose article.
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`@/blog/_posts/${slug}.mdx`);
  return (
    <main className='mx-auto w-full max-w-3xl flex-1 px-6 py-16'>
      <header className='mb-10'>
        <div className='flex items-center gap-3 text-sm text-zinc-500'>
          <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
          <span className='rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'>
            {metadata.category}
          </span>
        </div>
      </header>
      <article className='prose prose-zinc dark:prose-invert max-w-none'>
        <Post />
      </article>
    </main>
  );
}
