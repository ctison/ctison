import '@mantine/code-highlight/styles.css';
import { permanentRedirect } from 'next/navigation';
import { Content } from './Content';
import { tabs } from './tabs';

export async function generateStaticParams() {
  return tabs.map((tab) => ({ slug: [tab.slug] }));
}

export default function Page({
  params: { slug },
}: {
  params: { slug?: string[] };
}) {
  if (slug !== undefined && slug.length > 0) {
    if (slug.length > 1 || tabs.findIndex((tab) => tab.slug === slug[0]) === -1)
      permanentRedirect('/web3');
  }

  return <Content slug={slug?.[0] ?? tabs[0].slug} />;
}
