'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { Box, Button, Stack, Text, Title, Tooltip } from '@mantine/core';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box mih={500} p='sm' style={{ border: 'solid 10px red' }}>
      <Stack align='center'>
        <Title>ERROR captured from React Error Boundary</Title>
        <Text display='block'>
          <b>Name:</b> {error.name}
        </Text>
        <Text display='block'>
          <b>Message:</b> {error.message}
        </Text>
        <Text display='block'>
          <b>Digest:</b> {error.digest}
        </Text>
        <CodeHighlight
          code={error.stack ?? ''}
          pr='lg'
          styles={{
            code: {
              wordBreak: 'break-all',
              whiteSpace: 'initial',
            },
          }}
        />
        <Tooltip label='Will error again'>
          <Button onClick={reset} variant='outline' c='red'>
            Reset
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}
