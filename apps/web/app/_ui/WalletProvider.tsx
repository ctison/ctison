'use client';

import { EIP6963Connector, walletConnectProvider } from '@web3modal/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import {
  EthereumMono as IconEthereum,
  Arbitrum as IconArbitrum,
  Avalanche as IconAvalanche,
  BinanceSmartChain as IconBinanceSmartChain,
  Polygon2 as IconPolygon,
} from 'react-web3-icons';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import {
  goerli,
  mainnet,
  sepolia,
  arbitrum,
  avalanche,
  bsc,
  polygon,
} from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia, arbitrum, avalanche, bsc, polygon],
  [
    walletConnectProvider({
      projectId: walletConnectProjectId,
    }),
    publicProvider(),
  ],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId: walletConnectProjectId, showQrModal: false },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: '@ctison',
      },
    }),
  ],
});

createWeb3Modal({
  chains,
  wagmiConfig,
  projectId: walletConnectProjectId,
  themeVariables: {
    '--w3m-z-index': 1000,
  },
});

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
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
