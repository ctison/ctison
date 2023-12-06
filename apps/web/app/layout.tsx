import './layout.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';

import { AppShell } from './_ui/AppShell';
import { NavigationProgress } from '@/_ui/NavigationProgress';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { WalletProvider } from './_ui/WalletProvider';
import { theme } from './theme';
import { WindowExpando } from './_ui/WindowExpando';
import { ReactQueryProvider } from './_ui/ReactQueryProvider';

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
          <WalletProvider>
            <WindowExpando />
            <MantineProvider theme={theme}>
              <Suspense fallback={null}>
                <NavigationProgress />
              </Suspense>
              <Notifications />
              <AppShell>{children}</AppShell>
            </MantineProvider>
          </WalletProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
