import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Treat .mdx files as routable/importable pages alongside TS sources.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  devIndicators: {
    position: 'bottom-right',
  },
};

// Configure MDX with GFM and syntax highlighting; Turbopack needs string-named plugins.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [['rehype-pretty-code', { theme: 'github-dark' }]],
  },
});

export default withMDX(nextConfig);
