import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { AppShell } from '@/_ui/AppShell';
import { WindowExpando } from '@/_ui/WindowExpando';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import type { Metadata } from 'next';
import { Wallet } from './_ui/Wallet';
import { theme } from './theme';

export const metadata: Metadata = {
  title: '@ctison',
  description: "@ctison's personal website",
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
        <Wallet>
          <WindowExpando />
          <MantineProvider theme={theme}>
            <NavigationProgress />
            <Notifications />
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </Wallet>
      </body>
    </html>
  );
}
