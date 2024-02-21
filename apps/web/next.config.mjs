import withBundleAnalyzer from '@next/bundle-analyzer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  webpack: (config) => {
    // https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // config.experiments.asyncWebAssembly = true;
    config.experiments.syncWebAssembly = true;
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
});
