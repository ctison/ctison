/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/rainbow-me/rainbowkit/blob/main/examples/with-next-app/next.config.js
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  experimental: {
    typedRoutes: true,
    // https://mantine.dev/guides/next/#app-router-tree-shaking
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
    ],
  },
};

export default nextConfig;
