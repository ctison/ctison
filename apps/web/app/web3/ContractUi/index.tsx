'use client';

import {
  ActionIcon,
  Badge,
  CloseButton,
  Group,
  LoadingOverlay,
  Tabs,
} from '@mantine/core';
import { useDidUpdate, useListState, useLocalStorage } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import { ContractUiApp } from './ContractUiApp';
import { FaPlus } from 'react-icons/fa6';

interface TabState {
  id: string;
}

export const ContractUi: React.FC = () => {
  const [tabStorage, setTabStorage] = useLocalStorage<TabState[]>({
    key: 'contract-ui-tabs',
    defaultValue: [],
    getInitialValueInEffect: true,
  });
  const [tabs, tabsHandlers] = useListState<TabState>(tabStorage);
  const [loaded, setLoaded] = useState(false);

  useDidUpdate(() => {
    if (!loaded) {
      setLoaded(true);
      tabsHandlers.setState(tabStorage);
    }
  }, [tabStorage]);

  useDidUpdate(() => {
    setTabStorage(tabs);
  }, [setTabStorage, tabs]);

  const [activeTab, setActiveTab] = useLocalStorage<string | null>({
    key: 'contract-ui-active-tab',
    defaultValue: null,
  });

  const createTab = useCallback(() => {
    const id = `${Date.now()}-${Math.random()}`.replaceAll('.', '');
    tabsHandlers.append({
      id,
    });
    setActiveTab(id);
  }, [tabsHandlers, setActiveTab]);

  const changeTab = useCallback(
    (value: string | null) => {
      if (value === null) {
        setActiveTab(null);
      } else if (value === '+') {
        createTab();
      } else {
        setActiveTab(value);
      }
    },
    [createTab, setActiveTab],
  );

  const removeTab = useCallback(
    (id: string) => {
      const idx = tabs.findIndex((tab) => tab.id === id);
      if (activeTab === tabs[idx].id) {
        let newActiveTab: string | null = null;
        if (tabs.length === 1) {
        } else if (idx >= tabs.length - 1) {
          newActiveTab = tabs[idx - 1].id;
        } else {
          newActiveTab = tabs[idx + 1].id;
        }
        setActiveTab(newActiveTab);
      }
      tabsHandlers.remove(idx);
    },
    [tabs, activeTab, tabsHandlers, setActiveTab],
  );

  return (
    <>
      <LoadingOverlay visible={!loaded} loaderProps={{ type: 'bars' }} />
      {loaded && (
        <Tabs value={activeTab} onChange={changeTab} variant='outline'>
          <Tabs.List>
            {tabs.map((tab, idx) => (
              <Tabs.Tab key={tab.id} value={tab.id}>
                <Group gap='xs'>
                  <Badge
                    variant='dot'
                    color={tab.id === activeTab ? 'green' : 'gray'}
                  >
                    {idx}
                  </Badge>
                  <CloseButton
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                  />
                </Group>
              </Tabs.Tab>
            ))}
            <Tabs.Tab value='+'>
              <ActionIcon variant='subtle' color='black'>
                <FaPlus />
              </ActionIcon>
            </Tabs.Tab>
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.id} value={tab.id}>
              <ContractUiApp id={tab.id} />
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
    </>
  );
};
