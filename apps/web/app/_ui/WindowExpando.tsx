'use client';

import { useEffect, useMemo } from 'react';
import {
  publicActionReverseMirage,
  walletActionReverseMirage,
} from 'reverse-mirage';
import { usePublicClient, useWalletClient } from 'wagmi';

export const WindowExpando: React.FC = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const extendedWalletClient = useMemo(
    () => walletClient?.extend(walletActionReverseMirage),
    [walletClient],
  );

  const extendedPublicClient = useMemo(
    () => publicClient?.extend(publicActionReverseMirage),
    [publicClient],
  );

  useEffect(() => {
    console.log('https://viem.sh/docs/actions/wallet/introduction.html');
    console.log('https://www.reversemirage.com/');
    console.log('Public viem client available at window.public');
    console.log('Wallet viem client available at window.wallet');
  }, []);

  useWindowExpando('wallet', extendedWalletClient);
  useWindowExpando('public', extendedPublicClient);

  return null;
};

function useWindowExpando(key: string, value: unknown) {
  useEffect(() => {
    (window as any)[key] = value;
  }, [key, value]);
}
