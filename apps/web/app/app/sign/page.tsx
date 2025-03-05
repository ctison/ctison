'use client';

import {
  Alert,
  Button,
  CloseButton,
  Container,
  Group,
  Notification,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDidUpdate, useListState, useLocalStorage } from '@mantine/hooks';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { IoTrashBinOutline } from 'react-icons/io5';
import { SignMessage } from './SignMessage';
import { VerifyMessage } from './VerifyMessage';
import { AiFillEdit } from 'react-icons/ai';
import { CodeHighlight } from '@mantine/code-highlight';

export const SignIcon = AiFillEdit;

export type History = {
  id: string;
  date: number;
  address: `0x${string}`;
  message: string;
  error?: Error | null;
} & (
  | {
      type: 'sign';
      signature?: `0x${string}`;
    }
  | {
      type: 'verify';
      signature: `0x${string}`;
      valid?: boolean;
    }
);

export const SignUi: React.FC = () => {
  const [historyStorage, setHistoryStorage] = useLocalStorage<History[]>({
    key: 'sign-ui-history',
    defaultValue: [],
  });

  const [history, historyHandlers] = useListState<History>(historyStorage);

  const addHistory = useCallback(
    (item: Omit<History, 'id' | 'date'>) => {
      const now = Date.now();
      const id = `${now}-${Math.random()}`;
      historyHandlers.prepend({
        ...item,
        id,
        date: now,
      } as History);
      return id;
    },
    [historyHandlers],
  );

  const updateHistory = useCallback(
    (id: string, history: Partial<History>) => {
      historyHandlers.applyWhere(
        (item) => item.id === id,
        (item) =>
          ({
            ...item,
            ...history,
          }) as History,
      );
    },
    [historyHandlers],
  );

  useDidUpdate(() => {
    setHistoryStorage(history.filter((item) => item.signature || item.error));
  }, [setHistoryStorage, history]);

  const [loaded, setLoaded] = useState(false);

  useDidUpdate(() => {
    if (!loaded) {
      setLoaded(true);
      historyHandlers.setState(historyStorage);
    }
  }, [historyStorage]);

  return (
    <Container size='xl' my='xl'>
      <Stack>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <SignMessage addHistory={addHistory} updateHistory={updateHistory} />
          <VerifyMessage
            addHistory={addHistory}
            updateHistory={updateHistory}
          />
        </SimpleGrid>
        <Stack>
          {history.length > 0 && (
            <Button.Group>
              <Button
                color='red'
                variant='subtle'
                onClick={() => {
                  historyHandlers.setState([]);
                }}
                leftSection={<IoTrashBinOutline />}
              >
                Clear history
              </Button>
            </Button.Group>
          )}
          {history.map((item) => (
            <Notification
              title={
                <Group>
                  <Text fw={500} tt='capitalize'>
                    {item.type}
                  </Text>
                  <Text c='dimmed' size='xs'>
                    {format(item.date, 'LLLL d, yyyy HH:mm:ss')}
                  </Text>
                  <Tooltip label='Delete'>
                    <CloseButton
                      ml='auto'
                      style={{ justifyContent: 'flex-end' }}
                      variant='transparent'
                      onClick={() => {
                        const idx = history.findIndex(
                          (_item) => item.id === _item.id,
                        );
                        historyHandlers.remove(idx);
                      }}
                    />
                  </Tooltip>
                </Group>
              }
              key={item.id}
              color={
                item.error || (item.type === 'verify' && item.valid === false)
                  ? 'red'
                  : 'green'
              }
              loading={
                item.type === 'sign'
                  ? !item.signature && !item.error
                  : item.error === undefined
              }
              withBorder
              withCloseButton={false}
            >
              <Text size='sm' fw={500} c='black'>
                Address
              </Text>
              <CodeHighlight language='json' code={item.address} />
              <Text size='sm' fw={500} c='black'>
                Message
              </Text>
              <CodeHighlight language='json' code={item.message} />
              {item.signature && (
                <>
                  <Text size='sm' fw={500} c='black'>
                    Signature
                  </Text>
                  <CodeHighlight language='json' code={item.signature} />
                </>
              )}
              {item.error && (
                <Alert color='red' title={item.error.name} mt='sm'>
                  {item.error.message}
                </Alert>
              )}
              {item.type === 'verify' && item.valid !== undefined && (
                <Text c='black' mt='lg' size='sm'>
                  {item.valid ? '✅ Valid' : '❌ Invalid'}
                </Text>
              )}
            </Notification>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignUi;
