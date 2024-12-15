'use client';

import { CopyButton } from '@/_ui/ButtonCopy';
import {
  Accordion,
  ActionIcon,
  Alert,
  Box,
  Center,
  Group,
  Loader,
  Text,
  Tooltip,
} from '@mantine/core';
import { Editor } from '@monaco-editor/react';
import { type UseQueryResult } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

export const Result: React.FC<
  Readonly<{
    query: UseQueryResult;
    title: string;
    id: string;
  }>
> = ({ query, title, id }) => {
  const data = useMemo(
    () => JSON.stringify(query.data, undefined, 2),
    [query.data],
  );
  useEffect(() => {
    if (query.isError) console.log(query.error);
  }, [query.error, query.isError]);
  return (
    <Accordion.Item value={title}>
      <Accordion.Control>
        <Group>
          {title}
          {query.isFetching && (
            <Tooltip label='Fetching'>
              <Loader size='xs' />
            </Tooltip>
          )}
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Group>
          <Text size='xs' c={query.isError ? 'red' : 'dimmed'}>
            {query.isPending
              ? 'Fetching'
              : query.isSuccess
                ? `Fetched at ${format(
                    query.dataUpdatedAt,
                    'HH:mm:ss u/LLL/dd',
                  )}`
                : query.isError
                  ? `Error at ${format(
                      query.errorUpdatedAt,
                      'HH:mm:ss u/LLL/dd',
                    )}`
                  : ''}
          </Text>
          <ActionIcon
            variant='subtle'
            onClick={() => {
              void query.refetch();
            }}
            title='Refresh'
            disabled={query.isFetching}
          >
            <MdOutlineRefresh />
          </ActionIcon>
          <CopyButton value={data} />
        </Group>
        {query.isPending ? (
          <Center>
            <Loader type='dots' size='sm' />
          </Center>
        ) : query.isError ? (
          <Alert color='red' title={query.error.name}>
            {query.error.message}
          </Alert>
        ) : query.isSuccess ? (
          <Box
            style={{ resize: 'vertical', overflow: 'auto' }}
            mih={300}
            h={300}
          >
            <Editor
              language='json'
              path={`${id}-${title}`}
              value={data}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                bracketPairColorization: { enabled: true },
                tabSize: 2,
                scrollbar: {
                  horizontal: 'hidden',
                  vertical: 'hidden',
                },
              }}
            />
          </Box>
        ) : (
          <>{}</>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
