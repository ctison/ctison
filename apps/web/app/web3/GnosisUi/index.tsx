'use client';

import {
  CloseButton,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { useListState, useSessionStorage } from '@mantine/hooks';
import { default as SafeApiKit } from '@safe-global/api-kit';
import React, { useCallback, useEffect } from 'react';
import { SafeInfos, SafeInfosForm } from './SafeInfos';
import { UserInfos, UserInfosForm } from './UserInfos';

export const safeSupportedChains = {
  Ethereum: BigInt(1),
  Goerli: BigInt(5),
  'Binance Smart Chain': BigInt(56),
  'Gnosis Chain': BigInt(100),
  Polygon: BigInt(137),
  'Polygon zkEVM Testnet': BigInt(1442),
  'Torus Testnet': BigInt(8194),
  Holesky: BigInt(170007),
  'Polygon Mumbai': BigInt(80001),
  'Base Goerli Testnet': BigInt(84531),
  Sepolia: BigInt(11155111),
} as const;

export const useSafeApiKit = (chain: keyof typeof safeSupportedChains) => {
  return new SafeApiKit({
    chainId: safeSupportedChains[chain],
  });
};

export type Tab = {
  id: string;
  title: string;
} & (
  | {
      type: 'safe-infos';
      safeAddress: `0x${string}`;
      chain: keyof typeof safeSupportedChains;
    }
  | {
      type: 'user-infos';
      userAddress: `0x${string}`;
      chain: keyof typeof safeSupportedChains;
    }
);

export const GnosisUi: React.FC = () => {
  const [tabsStorage, setStabsStorage] = useSessionStorage<Tab[]>({
    key: 'gnosis-ui-tabs',
    defaultValue: [],
    getInitialValueInEffect: false,
  });

  const [tabs, tabsHandlers] = useListState<Tab>(tabsStorage);

  const [activeTab, setActiveTab] = useSessionStorage<string | null>({
    key: 'gnosis-ui-active-tab',
    defaultValue: null,
  });

  useEffect(() => {
    setStabsStorage(tabs);
  }, [setStabsStorage, tabs]);

  const createTab = useCallback(
    (tab: Partial<Tab>) => {
      const id = `${Date.now()}-${Math.random()}`.replaceAll('.', '');
      let title: string;
      if (tab.type === 'safe-infos') {
        title = `Safe ${tab.safeAddress}`;
      } else if (tab.type === 'user-infos') {
        title = `User ${tab.userAddress}`;
      } else {
        throw new Error(`Invalid tab type: ${tab.type}`);
      }
      tabsHandlers.append({
        ...tab,
        id,
        title,
      } as Tab);
      setActiveTab(id);
    },
    [setActiveTab, tabsHandlers],
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
    <Stack>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <SafeInfosForm createTab={createTab} />
        <UserInfosForm createTab={createTab} />
      </SimpleGrid>
      {tabs.length > 0 && (
        <Tabs value={activeTab} onChange={setActiveTab} variant='outline'>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.id} value={tab.id}>
                <Group maw='200px' wrap='nowrap'>
                  <Text truncate='end' span>
                    {tab.title}
                  </Text>
                  <CloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                  />
                </Group>
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.id} value={tab.id}>
              {tab.type === 'safe-infos' ? (
                <SafeInfos
                  id={tab.id}
                  chain={tab.chain}
                  safeAddress={tab.safeAddress}
                />
              ) : tab.type === 'user-infos' ? (
                <UserInfos
                  id={tab.id}
                  chain={tab.chain}
                  userAddress={tab.userAddress}
                />
              ) : null}
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
    </Stack>
  );
};
