import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import './global.css';

import { NavigationProgress } from '@/_layout/NavigationProgress';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AppShell } from './_layout/AppShell';
import { ReactQueryProvider } from './_layout/ReactQueryProvider';
import { Web3Provider } from './_layout/Web3Provider';
import { WindowExpando } from './_layout/WindowExpando';
import { theme } from './theme';
import { Spotlight } from './_layout/Spotlight';

export const metadata: Metadata = {
  title: {
    default: 'Home | @ctison',
    template: '%s | @ctison',
  },
  description: "@ctison's website",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    types: {
      'application/rss+xml': [
        {
          url: 'feed.xml',
          title: `@ctison's blog`,
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <Web3Provider>
            <WindowExpando />
            <MantineProvider theme={theme}>
              <Suspense fallback={null}>
                <NavigationProgress />
              </Suspense>
              <Notifications />
              <Spotlight />
              <AppShell>{children}</AppShell>
            </MantineProvider>
          </Web3Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
