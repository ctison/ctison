'use client';

import '@mantine/code-highlight/styles.css';
import { Container, Paper, SimpleGrid } from '@mantine/core';
import { SignMessage } from './SignMessage';
import { VerifyMessage } from './VerifyMessage';

export default function Web3() {
  return (
    <Container>
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
    <Paper withBorder p='xl' shadow='xl' radius='xs'>
      {children}
    </Paper>
  );
};
