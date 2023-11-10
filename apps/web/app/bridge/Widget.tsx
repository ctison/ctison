'use client';

import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { Box } from '@mantine/core';
import { getWalletClient } from '@wagmi/core';
import { providers } from 'ethers';
import { useMemo } from 'react';
import {
  WalletClient,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi';

export const Widget: React.FC = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const signer = useEthersSigner();
  const { switchNetworkAsync } = useSwitchNetwork();

  const widgetConfig = useMemo((): WidgetConfig => {
    return {
      integrator: 'ctison',
      variant: 'expandable',
      subvariant: 'split',
      walletManagement: {
        signer,
        connect: async () => {
          const result = await connectAsync({ connector: connectors[0] });
          const walletClient = await result.connector?.getWalletClient();
          if (walletClient) {
            return walletClientToSigner(walletClient);
          } else {
            throw Error('WalletClient not found');
          }
        },
        disconnect: async () => {
          disconnect();
        },
        switchChain: async (chainId: number) => {
          if (switchNetworkAsync === undefined) {
            throw Error('switchNetworkAsync is undefined');
          }
          await switchNetworkAsync(chainId);
          const walletClient = await getWalletClient();
          if (walletClient) {
            return walletClientToSigner(walletClient);
          } else {
            throw Error('WalletClient not found');
          }
        },
      },
    };
  }, [signer, connectAsync, connectors, disconnect, switchNetworkAsync]);

  return (
    <Box mt='xl'>
      <LiFiWidget integrator='ctison' config={widgetConfig} />
    </Box>
  );
};

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );
}
