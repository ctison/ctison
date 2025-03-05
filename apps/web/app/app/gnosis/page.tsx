'use client';

import { type TabState } from '@/_ui/Tabs';
import { TabsController } from '@/_ui/Tabs/Controller';
import { Tabs } from '@/_ui/Tabs/Tabs';
import { Container, SimpleGrid, Stack } from '@mantine/core';
import React, { useCallback, useMemo } from 'react';
import { SafeIcon, SafeInfos, SafeInfosForm } from './SafeInfos';
import { UserIcon, UserInfos, UserInfosForm } from './UserInfos';

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

export type Tab = TabState &
  (
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
  const tabsController = useMemo(() => new TabsController<Tab>(), []);
  const createTab = useCallback(
    (tab: Partial<Tab>) => {
      tabsController.dispatch('create-tab', tab);
    },
    [tabsController],
  );

  return (
    <Container size='xl' my='xl'>
      <Stack>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <SafeInfosForm createTab={createTab} />
          <UserInfosForm createTab={createTab} />
        </SimpleGrid>
        <Tabs
          controller={tabsController}
          localStorageKey='gnosis-ui'
          TitleLeftSection={({ tab }) => (
            <>
              {tab.type === 'safe-infos' ? (
                <SafeIcon />
              ) : tab.type === 'user-infos' ? (
                <UserIcon />
              ) : null}
            </>
          )}
          Content={({ tab }) => (
            <>
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
            </>
          )}
        />
      </Stack>
    </Container>
  );
};

export default GnosisUi;
