import { type NextConfig } from 'next';
import { type Configuration as WebpackConfig } from 'webpack';

export default {
  webpack: (config: WebpackConfig) => {
    // cSpell:words lokijs
    (config.externals as string[]).push('pino-pretty', 'lokijs', 'encoding');
    config.experiments!.syncWebAssembly = true;
    return config;
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  devIndicators: {
    position: 'bottom-right',
  },
} satisfies NextConfig;
