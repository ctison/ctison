'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import {
  Arbitrum as IconArbitrum,
  Avalanche as IconAvalanche,
  BinanceSmartChain as IconBinanceSmartChain,
  EthereumMono as IconEthereum,
  Polygon2 as IconPolygon,
} from 'react-web3-icons';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  goerli,
  mainnet,
  polygon,
  sepolia,
} from 'wagmi/chains';

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const chains = [
  mainnet,
  goerli,
  sepolia,
  arbitrum,
  avalanche,
  bsc,
  polygon,
] as const;

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: walletConnectProjectId,
  metadata: {
    name: 'Next Starter Template',
    description: 'A Next.js starter template with Web3Modal v3 + Wagmi',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
});

createWeb3Modal({
  wagmiConfig,
  projectId: walletConnectProjectId,
  themeVariables: {
    '--w3m-z-index': 1000,
  },
});

export const Web3Provider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};

export const chainToChainId = chains.reduce(
  (acc, chain) => ({ ...acc, [chain.name]: chain.id }),
  {},
) as Record<(typeof chains)[number]['name'], (typeof chains)[number]['id']>;

export const chainIdToIcon: Record<number, JSX.Element> = {
  [mainnet.id]: <IconEthereum color='black' />,
  [goerli.id]: <IconEthereum color='gray' />,
  [sepolia.id]: <IconEthereum color='gray' />,
  [arbitrum.id]: <IconArbitrum />,
  [avalanche.id]: <IconAvalanche />,
  [bsc.id]: <IconBinanceSmartChain />,
  [polygon.id]: <IconPolygon />,
};
