'use client';

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  goerli,
  mainnet,
  polygon,
  sepolia,
} from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { cookieStorage, createStorage } from '@wagmi/core';
import type React from 'react';
import {
  Arbitrum as IconArbitrum,
  Avalanche as IconAvalanche,
  BinanceSmartChain as IconBinanceSmartChain,
  EthereumMono as IconEthereum,
  Polygon2 as IconPolygon,
} from 'react-web3-icons';
import { WagmiProvider } from 'wagmi';

const walletConnectProjectId =
  process.env['NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID']!;

const chains: Parameters<typeof createAppKit>[0]['networks'] = [
  arbitrum,
  avalanche,
  bsc,
  goerli,
  mainnet,
  polygon,
  sepolia,
];

const wagmiAdapter = new WagmiAdapter({
  networks: chains,
  projectId: walletConnectProjectId,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: chains,
  metadata: {
    name: 'Next Starter Template',
    description: 'A Next.js starter template with Web3Modal v3 + Wagmi',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  projectId: walletConnectProjectId,
  features: {
    analytics: true,
  },
  themeVariables: {
    '--w3m-z-index': 1000,
  },
});

export const Web3Provider: React.FC<Readonly<React.PropsWithChildren>> = ({
  children,
}) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>{children}</WagmiProvider>
  );
};

export const chainToChainId = chains.reduce(
  (acc, chain) => ({ ...acc, [chain.name]: parseInt(`${chain.id}`) }),
  {},
) as Record<(typeof chains)[number]['name'], number>;

export const chainIdToIcon: Record<number, React.ReactNode> = {
  [mainnet.id]: <IconEthereum color='black' />,
  [goerli.id]: <IconEthereum color='gray' />,
  [sepolia.id]: <IconEthereum color='gray' />,
  [arbitrum.id]: <IconArbitrum />,
  [avalanche.id]: <IconAvalanche />,
  [bsc.id]: <IconBinanceSmartChain />,
  [polygon.id]: <IconPolygon />,
};
