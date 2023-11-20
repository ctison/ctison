'use client';

import '@mantine/code-highlight/styles.css';
import { Container, Paper, SimpleGrid } from '@mantine/core';
import { SignMessage } from './SignMessage';
import { VerifyMessage } from './VerifyMessage';

export default function Web3() {
  return (
    <Container py='xl'>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Tool>
          <SignMessage />
        </Tool>
        <Tool>
          <VerifyMessage />
        </Tool>
      </SimpleGrid>
    </Container>
  );
}

const Tool: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Paper withBorder px='lg' py='xl' shadow='xl' radius='xs'>
      {children}
    </Paper>
  );
};
