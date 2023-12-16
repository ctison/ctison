import withBundleAnalyzer from '@next/bundle-analyzer';
import { withContentlayer } from 'next-contentlayer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  withContentlayer({
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
