import { Skeleton } from '@mantine/core';
import dynamic from 'next/dynamic';

export const NoSsrWeb3WalletButton = dynamic(
  () => import('./Web3WalletButton').then((m) => m.Web3WalletButton),
  { ssr: false, loading: () => <Skeleton h={42} /> },
);
