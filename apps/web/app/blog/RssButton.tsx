'use client';

import { ActionIcon, Group, Popover, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { TiRss } from 'react-icons/ti';
import { LuClipboardCheck } from 'react-icons/lu';

export const RssButton = () => {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <Popover opened={clipboard.copied} position='right'>
      <Popover.Target>
        <ActionIcon
          variant='subtle'
          style={{ verticalAlign: 'sub' }}
          size='3rem'
          onClick={() =>
            clipboard.copy(
              `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/feed.xml`,
            )
          }
        >
          <TiRss size='80%' />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group gap={5}>
          <LuClipboardCheck />
          <Text size='sm'>Copied RSS URL</Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
