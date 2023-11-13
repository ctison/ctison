import { Stack, Title } from '@mantine/core';

export default function Page() {
  return (
    <Stack
      p='xl'
      align='center'
      mih={300}
      style={{ border: 'solid 5px green' }}
    >
      <Title>Default Slot 1</Title>
    </Stack>
  );
}
