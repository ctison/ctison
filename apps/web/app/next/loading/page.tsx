import { PageLoading } from '@/_ui/PageLoading';
import { Stack, Title } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <Stack align='center'>
        <Title>Infinite Loading Page</Title>
      </Stack>
      <PageLoading />
    </>
  );
}
