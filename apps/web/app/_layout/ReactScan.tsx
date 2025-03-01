'use client';

import { useEffect } from 'react';
import { scan } from 'react-scan';

export const ReactScan: React.FC = () => {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === 'development',
    });
  }, []);
  return null;
};
