'use client';

import { useSDK } from '@thirdweb-dev/react';
import { useEffect } from 'react';

export const WindowExpando: React.FC = () => {
  const thirdWeb = useSDK();

  useWindowExpando('thirdWeb', thirdWeb);

  return null;
};

function useWindowExpando(key: string, value: unknown) {
  useEffect(() => {
    (window as any)[key] = value;
  }, [key, value]);
}
