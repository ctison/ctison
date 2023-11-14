import { Loader, Paper, Stack, Title } from '@mantine/core';

export default function Loading() {
  return (
    <Paper withBorder m='lg' p='lg'>
      <Stack align='center'>
        <Title order={3}>Loading page with slug</Title>
        <Loader color='green.9' type='bars' />
      </Stack>
    </Paper>
  );
}
