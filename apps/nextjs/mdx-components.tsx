import type { MDXComponents } from 'mdx/types';

// Global component overrides for all MDX content; body styling is handled by the
// `prose` wrapper on each post, so this stays minimal for now.
const components: MDXComponents = {};

// Required by @next/mdx (App Router): supplies the components used to render MDX.
export function useMDXComponents(): MDXComponents {
  return components;
}
