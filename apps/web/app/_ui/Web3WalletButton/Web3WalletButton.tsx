'use client';

import { Button, Group, Image, Indicator, Stack, Text } from '@mantine/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useBalance, useBlockNumber, useEnsName } from 'wagmi';
import { chainIdToIcon } from '../../_layout/Web3Provider';
import { useQueryClient } from '@tanstack/react-query';
import { formatUnits } from 'viem';

export interface Web3WalletButtonProps {}

export const Web3WalletButton: React.FC = () => {
  const { chain, address, isConnected } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    void openWeb3Modal();
  }, [openWeb3Modal]);

  const { data: balance, queryKey: useBalanceQueryKey } = useBalance({
    chainId: chain?.id,
    address,
  });
  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey: useBalanceQueryKey });
  }, [blockNumber, queryClient, useBalanceQueryKey]);
  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address,
  });

  const innerButton = useMemo(() => {
    if (!isConnected) {
      return 'Connect Wallet';
    }
    const connectedWalletImage = window.localStorage.getItem(
      '@w3m/connected_wallet_image_url',
    );
    return (
      <Group wrap='nowrap' gap={12}>
        <Indicator
          position='bottom-end'
          size={20}
          color='transparent'
          label={chainIdToIcon[chain!.id]}
          offset={4}
        >
          <Image
            src={connectedWalletImage}
            h={32}
            w={32}
            alt='Connected wallet image'
            radius={5}
            p={2}
            bg='gray.1'
          />
        </Indicator>
        <Stack gap={0} align='flex-start'>
          <Text c='black' size='sm' fw={500}>
            {ensName
              ? ensName
              : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
          </Text>
          <Text c='gray.7' size='xs' fw={400} truncate='end'>
            {balance !== undefined &&
              formatUnits(balance.value, balance.decimals).slice(
                0,
                -balance.decimals + 3,
              )}{' '}
            {balance?.symbol}
          </Text>
        </Stack>
      </Group>
    );
  }, [isConnected, address, balance, chain, ensName]);

  return (
    <Button
      onClick={onClick}
      color={isConnected ? 'gray.3' : 'black'}
      radius='md'
      variant={isConnected ? 'outline' : undefined}
      h={isConnected ? 56 : 48}
      px={12}
      justify={isConnected ? 'flex-start' : undefined}
    >
      {innerButton}
    </Button>
  );
};
