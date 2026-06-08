import type { PostMeta } from '@/blog/_lib/types';

// Augments the @types/mdx module declaration so each post's exported `metadata`
// is type-checked against the shared PostMeta shape wherever it is imported.
declare module '*.mdx' {
  export const metadata: PostMeta;
}
