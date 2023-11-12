'use client';

import { useEffect, useMemo } from 'react';
import {
  publicActionReverseMirage,
  walletActionReverseMirage,
} from 'reverse-mirage';
import { useWalletClient } from 'wagmi';

export const WindowExpando: React.FC = () => {
  const { data: walletClient } = useWalletClient();

  const extendedWalletClient = useMemo(
    () =>
      walletClient
        ?.extend(walletActionReverseMirage)
        .extend(publicActionReverseMirage),
    [walletClient],
  );

  useEffect(() => {
    console.log('https://viem.sh/docs/actions/wallet/introduction.html');
    console.log('https://www.reversemirage.com/');
  }, []);

  useWindowExpando('viem', extendedWalletClient);

  return null;
};

function useWindowExpando(key: string, value: unknown) {
  useEffect(() => {
    (window as any)[key] = value;
  }, [key, value]);
}
