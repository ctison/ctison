'use client';

import { useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { useAccount, useConnect, useNetwork, useWalletClient } from 'wagmi';

export const WindowExpando: React.FC = () => {
  const { chain } = useNetwork();
  const { connector } = useAccount();
  const { connectors } = useConnect();
  const { data } = useWalletClient();

  useEffect(() => {
    (window as any).viem = createPublicClient({
      chain: mainnet,
      transport: http(),
    });
    console.log(
      `Viem client loaded: https://viem.sh/docs/getting-started.html`,
    );
  }, [chain]);

  useWindowExpando('connector', connector);
  useWindowExpando('connectors', connectors);
  useWindowExpando('data', data);

  return null;
};

function useWindowExpando(key: string, value: unknown) {
  useEffect(() => {
    (window as any)[key] = value;
    console.log(`window.${key} loaded`);
  }, [key, value]);
}
