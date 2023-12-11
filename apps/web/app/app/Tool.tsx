import { Paper } from '@mantine/core';

export const Tool: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      withBorder
      px='lg'
      py='xl'
      shadow='xl'
      radius='xs'
      style={{ breakInside: 'avoid' }}
    >
      {children}
    </Paper>
  );
};
