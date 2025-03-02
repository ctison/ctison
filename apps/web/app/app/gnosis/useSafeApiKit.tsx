import SafeApiKit from '@safe-global/api-kit';
import { useMemo } from 'react';
import { safeSupportedChains } from './page';

export const useSafeApiKit = (chain: keyof typeof safeSupportedChains) => {
  return useMemo(
    () =>
      new SafeApiKit({
        chainId: safeSupportedChains[chain],
      }),
    [chain],
  );
};
