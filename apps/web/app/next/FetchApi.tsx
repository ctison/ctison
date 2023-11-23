'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { Button, Checkbox, Stack, Title } from '@mantine/core';
import { useState } from 'react';

export const FetchApi: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [stream, setStream] = useState(false);
  return (
    <Stack
      miw='min(100%, 300px)'
      style={{ border: 'solid 1px lightgray' }}
      p='lg'
    >
      <Title>Fetch API</Title>
      <Checkbox
        checked={stream}
        onChange={(event) => setStream(event.currentTarget.checked)}
        label='Stream'
      />
      <Button
        onClick={async () => {
          const data = await fetch('/next/api?stream=' + stream);
          if (stream) {
            if (data.body === null) {
              setData('No body');
              return;
            }
            setData(null);
            const decoder = new TextDecoder();
            const reader = data.body.getReader();
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              setData((s) => `${s ?? ''}${decoder.decode(value)}\n`);
            }
          } else {
            setData(JSON.stringify(await data.json(), undefined, 2));
          }
        }}
      >
        Fetch API
      </Button>
      <Button onClick={() => setData(null)}>Reset</Button>
      {data !== null && (
        <CodeHighlight
          code={data}
          lang='json'
          mih={100}
          miw={300}
          maw='100%'
          pr='lg'
          styles={{
            code: {
              wordBreak: 'break-all',
              whiteSpace: 'initial',
            },
          }}
        />
      )}
    </Stack>
  );
};
