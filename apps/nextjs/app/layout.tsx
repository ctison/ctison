import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from './_ui/Header';
import { InlineScript } from './_ui/InlineScript';
import { Sidebar } from './_ui/Sidebar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '@ctison.dev',
  description: 'Personal website of ctison.',
};

// Inline script that applies the saved (or system) theme before paint to avoid a flash.
const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch {}
})();`;

// Inline script that applies the saved sidebar state before paint to avoid a width flash.
const sidebarScript = `(() => {
  try {
    const collapsed = localStorage.getItem('sidebar') === 'collapsed';
    document.documentElement.dataset.sidebar = collapsed ? 'collapsed' : 'expanded';
  } catch {}
})();`;

// Root layout: applies fonts, the theme bootstrap, and renders the header above every page.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeScript} />
        <InlineScript html={sidebarScript} />
      </head>
      <body className='flex min-h-full flex-col font-sans'>
        <Header />
        <div className='flex flex-1'>
          <Sidebar />
          <div className='flex flex-1 flex-col'>{children}</div>
        </div>
      </body>
    </html>
  );
}
