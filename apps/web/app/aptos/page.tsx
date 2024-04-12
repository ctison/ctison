'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';

export default function Page() {
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();
  return (
    <>
      <></>
    </>
  );
}
