'use client';

import {
  completeNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

export const Link: React.FC<
  Readonly<
    React.PropsWithChildren<React.ComponentPropsWithRef<typeof NextLink>>
  >
> = (props) => {
  const pathname = usePathname();
  return (
    <NextLink
      onClick={() => {
        if (pathname !== props.href) startNavigationProgress();
        else completeNavigationProgress();
      }}
      {...props}
    />
  );
};
