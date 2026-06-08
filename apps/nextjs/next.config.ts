import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

// Strict Content-Security-Policy. `script-src`/`style-src` allow inline because Next's
// App Router streams per-page inline RSC scripts (and Tailwind/styled-jsx inject inline
// styles) that can't be statically hashed; the remaining directives lock everything to
// same-origin and shut down clickjacking, base-tag, and plugin/object vectors.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data:`,
  `font-src 'self' data:`,
  `connect-src 'self'`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
]
  .join('; ')
  .concat(';');

// Defense-in-depth security headers applied to every response.
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Treat .mdx files as routable/importable pages alongside TS sources.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  devIndicators: {
    position: 'bottom-right',
  },
  // Attach the security headers to all routes.
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
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
