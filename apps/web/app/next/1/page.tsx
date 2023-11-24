import { Stack, Title } from '@mantine/core';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Disable static rendering at build time by using cookies
  cookies();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <Stack
      p='xl'
      align='center'
      mih={300}
      style={{ border: 'solid 5px green' }}
    >
      <Title>Page 1</Title>
    </Stack>
  );
}
