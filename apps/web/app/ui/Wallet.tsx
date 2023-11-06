'use client';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  bsc,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const Wallet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { chains, publicClient } = configureChains(
    [mainnet, sepolia, bsc, polygon, optimism, arbitrum, base, zora],
    [publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME!,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
