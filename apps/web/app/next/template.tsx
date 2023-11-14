import { Box, Group, Title } from '@mantine/core';
import { Counter } from './Counter';

export const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box p='sm' style={{ border: 'solid 5px blue' }}>
      <Group justify='space-between'>
        <Title>Template</Title>
        <Group>
          <Counter />
        </Group>
      </Group>
      {children}
    </Box>
  );
};

export default Template;
