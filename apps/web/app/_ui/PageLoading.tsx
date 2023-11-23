import { Loader, Stack } from '@mantine/core';

export const PageLoading: React.FC = () => {
  return (
    <Stack
      justify='center'
      align='center'
      h='calc(100vh - var(--app-shell-header-height))'
    >
      <Loader size='xl' color='grape' />
    </Stack>
  );
};
