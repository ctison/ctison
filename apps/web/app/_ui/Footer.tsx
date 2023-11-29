import { Box, Container } from '@mantine/core';

export const Footer: React.FC = () => {
  return (
    <Box
      component='footer'
      h='var(--app-footer-height)'
      style={{
        borderTop: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      <Container></Container>
    </Box>
  );
};
