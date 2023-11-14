import { Stack, Title } from '@mantine/core';
import { Metadata, ResolvingMetadata } from 'next';
import { ThrowError } from './ThrowError';
import { FetchApi } from './FetchApi';

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  return {
    title: `${title?.absolute ?? 'MISSING PARENT TITLE'} Page`,
  };
};

export default function Next() {
  return (
    <Stack align='center' mih={300} p='xl' style={{ border: 'solid 5px red' }}>
      <Title>Page 0</Title>
      <ThrowError />
      <FetchApi />
    </Stack>
  );
}
