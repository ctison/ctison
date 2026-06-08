import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Post } from './types';

// Directory holding the .mdx post files (a private folder, excluded from routing).
const POSTS_DIR = path.join(process.cwd(), 'app/blog/_posts');

// Returns the slug of every post, used by generateStaticParams.
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

// Loads every post's metadata and returns the list sorted newest-first.
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => {
      const { metadata } = await import(`@/blog/_posts/${slug}.mdx`);
      return { slug, ...metadata };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
