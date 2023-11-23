import { Box, Group, Title } from '@mantine/core';
import { Metadata } from 'next';
import { Counter } from './Counter';
import { Navigation } from './Navigation';

export const metadata: Metadata = {
  title: 'Layout',
};

const Layout: React.FC<React.PropsWithChildren<{ slot1: React.ReactNode }>> = ({
  children,
  slot1,
}) => {
  return (
    <Box style={{ border: 'solid 5px purple' }} p='sm'>
      <Group justify='space-between'>
        <Group>
          <Title>Layout</Title>
          <Navigation />
        </Group>
        <Group>
          <Counter />
        </Group>
      </Group>
      {children}
      {slot1}
    </Box>
  );
};

export default Layout;
