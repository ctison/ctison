'use client';

import { useEffect } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';

export const WindowExpando: React.FC = () => {
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();

  useWindowExpando('viem', { public: publicClient, wallet: walletClient });

  return null;
};

function useWindowExpando(key: string, value: unknown) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (window as any)[key] = value;
  }, [key, value]);
}
