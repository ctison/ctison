import withBundleAnalyzer from '@next/bundle-analyzer';
import { withContentlayer } from 'next-contentlayer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  withContentlayer({
    // https://github.com/rainbow-me/rainbowkit/blob/main/examples/with-next-app/next.config.js
    // webpack: (config) => {
    //   config.resolve.fallback = { fs: false, net: false, tls: false };
    //   // config.experiments.asyncWebAssembly = true;
    //   return config;
    // },
    webpack: (config) => {
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
  }),
);
