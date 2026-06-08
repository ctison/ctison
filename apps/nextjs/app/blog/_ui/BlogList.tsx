'use client';

import { Input } from '@base-ui/react/input';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Post } from '../_lib/types';

// Formats an ISO date into a short, locale-stable label for the cards.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Interactive blog index: free-text search plus multi-select category chips.
export function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  // The set of categories present across all posts, alphabetically.
  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts],
  );

  // Posts matching the search text and the active category selection.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      const matchesCategory = selected.length === 0 || selected.includes(post.category);
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, selected]);

  return (
    <div className='mt-10'>
      <div className='flex flex-col gap-4'>
        <Input
          value={query}
          onValueChange={setQuery}
          placeholder='Search posts…'
          aria-label='Search posts'
          className='h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-400 focus-visible:border-zinc-400 dark:border-zinc-800 dark:focus-visible:border-zinc-600'
        />

        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setSelected([])}
            aria-pressed={selected.length === 0}
            className={`h-8 rounded-full border px-3 text-sm font-medium transition-colors ${
              selected.length === 0
                ? 'border-zinc-950 bg-zinc-950 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950'
                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900'
            }`}
          >
            All
          </button>

          <ToggleGroup
            multiple
            value={selected}
            onValueChange={setSelected}
            className='flex flex-wrap items-center gap-2'
          >
            {categories.map((category) => (
              <Toggle
                key={category}
                value={category}
                className='h-8 rounded-full border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 data-[pressed]:border-zinc-950 data-[pressed]:bg-zinc-950 data-[pressed]:text-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:data-[pressed]:border-zinc-50 dark:data-[pressed]:bg-zinc-50 dark:data-[pressed]:text-zinc-950'
              >
                {category}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className='mt-12 text-sm text-zinc-500'>No posts found.</p>
      ) : (
        <ul className='mt-8 flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800'>
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className='group flex flex-col gap-1 py-6 transition-opacity hover:opacity-80'
              >
                <div className='flex items-center gap-3 text-xs text-zinc-500'>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className='rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'>
                    {post.category}
                  </span>
                </div>
                <h2 className='text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50'>
                  {post.title}
                </h2>
                <p className='text-sm text-zinc-600 dark:text-zinc-400'>{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
