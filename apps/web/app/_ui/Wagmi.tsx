'use client';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  gnosis,
  linea,
  mantle,
  metis,
  mainnet,
  optimism,
  polygon,
  polygonZkEvm,
  scroll,
  zora,
  zkSync,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const Wagmi: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      arbitrum,
      avalanche,
      base,
      bsc,
      gnosis,
      linea,
      mantle,
      metis,
      mainnet,
      optimism,
      polygon,
      polygonZkEvm,
      scroll,
      zora,
      zkSync,
    ],
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
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
