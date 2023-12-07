'use client';

import {
  Container,
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
    <Container py='xl'>
      <Tabs
        value={selectedTab}
        variant='default'
        onChange={(value) => {
          window.history.replaceState(selectedTab, '', `/web3/${value}`);
          setSelectedTab(value!);
        }}
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTab key={tab.slug} value={tab.slug}>
              {tab.label}
            </TabsTab>
          ))}
        </TabsList>
        <Space h='md' />
        {tabs.map((tab) => (
          <TabsPanel key={tab.slug} value={tab.slug}>
            <tab.children />
          </TabsPanel>
        ))}
      </Tabs>
    </Container>
  );
};
