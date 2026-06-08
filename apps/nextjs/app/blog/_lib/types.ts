// Metadata every blog post declares via `export const metadata` in its .mdx file.
export type PostMeta = {
  title: string;
  // ISO published date (YYYY-MM-DD), used for ordering newest-first.
  date: string;
  category: string;
  description: string;
};

// A post in the index: its metadata plus the route slug derived from the filename.
export type Post = PostMeta & { slug: string };
