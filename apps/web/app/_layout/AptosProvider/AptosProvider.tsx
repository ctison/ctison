'use client';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

const wallets = [new PetraWallet()];

export type AptosProviderProps = React.PropsWithChildren<{}>;

export const AptosProvider: React.FC<AptosProviderProps> = ({ children }) => {
  return (
    <>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={true}
        onError={(error) => {
          console.error('error', error);
        }}
      >
        {children}
      </AptosWalletAdapterProvider>
      ;
    </>
  );
};
