'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  completeNavigationProgress,
  NavigationProgress as MantineNavigationProgress,
} from '@mantine/nprogress';

export interface NavigationProgressProps {}

export const NavigationProgress: React.FC<NavigationProgressProps> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    completeNavigationProgress();
  }, [pathname, searchParams]);
  return <MantineNavigationProgress />;
};
