import '@rainbow-me/rainbowkit/styles.css';

import { Wallet } from '@/app/ui/Wallet';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppShell } from './AppShell';
import { theme } from './theme';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Wallet>
          <MantineProvider theme={theme}>
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </Wallet>
      </body>
    </html>
  );
}
