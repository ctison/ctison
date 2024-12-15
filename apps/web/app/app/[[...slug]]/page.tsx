import '@mantine/code-highlight/styles.css';
import { permanentRedirect } from 'next/navigation';
import { Content } from './Content';
import { tabs } from './tabs';

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams() {
  return tabs.map((tab) => ({ slug: [tab.slug] }));
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug?: string[] }>;
}>) {
  const { slug } = await params;
  if (slug !== undefined && slug.length > 0) {
    if (slug.length > 1 || tabs.findIndex((tab) => tab.slug === slug[0]) === -1)
      permanentRedirect('/app');
  }

  return <Content slug={slug?.[0] ?? tabs[0]!.slug} />;
}
