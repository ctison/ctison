import { Stack, Title } from '@mantine/core';
import { use } from 'react';

export default function Page() {
  use(new Promise((resolve) => setTimeout(resolve, 1000)));
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
