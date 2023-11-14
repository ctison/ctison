import '@mantine/code-highlight/styles.css';
import { Loader, Stack, Text, Title } from '@mantine/core';
import { Suspense } from 'react';
import { Slugs } from './Slugs';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <Stack
      align='center'
      mih={300}
      style={{ border: 'solid 5px green' }}
      p='xl'
    >
      <Title>Page {params.slug?.join('/') ?? '3'}</Title>
      <Text>The following slugs were generated at build time:</Text>
      <Suspense fallback={<Loader color='pink' type='dots' />}>
        <Slugs />
      </Suspense>
    </Stack>
  );
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [{ slug: ['a'] }, { slug: ['b', 'c'] }];
}
