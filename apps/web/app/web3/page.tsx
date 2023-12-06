import '@mantine/code-highlight/styles.css';
import { Container, Paper, SimpleGrid, Stack } from '@mantine/core';
import { SignMessage } from './SignMessage';
import { VerifyMessage } from './VerifyMessage';
import { ContractUi } from './ContractUi';

export const metadata = {
  title: 'Web3',
};

export default function Web3() {
  return (
    <Container py='xl'>
      <Stack>
        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          <Tool>
            <SignMessage />
          </Tool>
          <Tool>
            <VerifyMessage />
          </Tool>
        </SimpleGrid>
        <Tool>
          <ContractUi />
        </Tool>
      </Stack>
    </Container>
  );
}

const Tool: React.FC<React.PropsWithChildren> = ({ children }) => {
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
