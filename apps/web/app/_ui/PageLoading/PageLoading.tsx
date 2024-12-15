import { Loader, Stack } from '@mantine/core';

export interface PageLoadingProps {}

export const PageLoading: React.FC<PageLoadingProps> = () => {
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
