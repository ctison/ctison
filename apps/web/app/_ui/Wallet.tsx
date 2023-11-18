'use client';

import { Arbitrum } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  frameWallet,
  metamaskWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnect,
} from '@thirdweb-dev/react';

export const Wallet: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <ThirdwebProvider
      // clientId={}
      theme='light'
      supportedWallets={[
        metamaskWallet({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
          recommended: true,
        }),
        walletConnect({
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
          recommended: true,
        }),
        coinbaseWallet(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
            embeddedWallet({
              auth: {
                options: ['email', 'google', 'apple', 'facebook'],
              },
            }),
            trustWallet({
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
            }),
            frameWallet(),
            rainbowWallet({
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
            }),
          ],
        }),
        embeddedWallet({
          auth: {
            options: ['email', 'google', 'apple', 'facebook'],
          },
        }),
        trustWallet(),
        frameWallet(),
        rainbowWallet(),
      ]}
      supportedChains={[Arbitrum]}
    >
      {props.children}
    </ThirdwebProvider>
  );
};
