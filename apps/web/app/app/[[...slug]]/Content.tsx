'use client';

import {
  Container,
  Group,
  Space,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { useState } from 'react';
import { tabs } from './tabs';

export const Content: React.FC<{ slug: string }> = ({ slug }) => {
  const [selectedTab, setSelectedTab] = useState(slug);

  useWindowEvent('popstate', (event) => {
    setSelectedTab(event.state ?? tabs[0].slug);
  });

  return (
    <Container size='xl' pt='md' pb='xl'>
      <Tabs
        value={selectedTab}
        variant='default'
        onChange={(value) => {
          window.history.replaceState(selectedTab, '', `/web3/${value}`);
          setSelectedTab(value!);
        }}
      >
        <TabsList pt='sm' justify='center'>
          {tabs.map((tab) => (
            <TabsTab key={tab.slug} value={tab.slug} fw={500}>
              <Group gap={5}>
                {tab.icon && <tab.icon />}
                {tab.label}
              </Group>
            </TabsTab>
          ))}
        </TabsList>
        <Space h='md' />
        {tabs.map((tab) => (
          <TabsPanel
            key={tab.slug}
            value={tab.slug}
            pos='relative'
            mih='calc(100dvh / 2)'
          >
            <tab.children />
          </TabsPanel>
        ))}
      </Tabs>
    </Container>
  );
};
