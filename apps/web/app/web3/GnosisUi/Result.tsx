import { CopyButton } from '@/_ui/CopyButton';
import {
  Accordion,
  ActionIcon,
  Box,
  Center,
  Group,
  Loader,
  Text,
  Tooltip,
} from '@mantine/core';
import { Editor } from '@monaco-editor/react';
import { UseQueryResult } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';

export const Result: React.FC<{
  query: UseQueryResult;
  title: string;
  id: string;
}> = ({ query, title, id }) => {
  const data = useMemo(
    () => JSON.stringify(query.data, undefined, 2),
    [query.data],
  );
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
          <Text size='xs' c='dimmed'>
            {query.isPending
              ? 'Fetching'
              : `Fetched at ${format(
                  query.dataUpdatedAt,
                  'u/LLL/dd HH:mm:ss',
                )}`}
          </Text>
          <ActionIcon
            variant='subtle'
            onClick={() => query.refetch()}
            title='Refresh'
            disabled={query.isFetching}
          >
            <MdOutlineRefresh />
          </ActionIcon>
          <CopyButton value={data} />
        </Group>
        {query.isSuccess ? (
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
          <Center>
            <Loader type='dots' size='sm' />
          </Center>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
