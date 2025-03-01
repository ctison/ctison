import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import './global.css';

import { NavigationProgress } from '@/_layout/NavigationProgress';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { AppShell } from './_layout/AppShell';
import { ReactQueryProvider } from './_layout/ReactQueryProvider';
import { Web3Provider } from './_layout/Web3Provider';
import { WindowExpando } from './_layout/WindowExpando';
import { theme } from './theme';
import { Spotlight } from './_layout/Spotlight';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactScan } from './_layout/ReactScan';

export const metadata: Metadata = {
  title: {
    default: 'Home | @ctison',
    template: '%s | @ctison',
  },
  description: "@ctison's website",
  alternates: {
    canonical: `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <ReactScan />
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <ColorSchemeScript />
      </head>
      <body>
        <Web3Provider>
          <ReactQueryProvider>
            <WindowExpando />
            <MantineProvider theme={theme}>
              <Suspense fallback={null}>
                <NavigationProgress />
              </Suspense>
              <Notifications />
              <Spotlight />
              <AppShell>{children}</AppShell>
            </MantineProvider>
          </ReactQueryProvider>
        </Web3Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
