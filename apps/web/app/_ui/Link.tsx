'use client';

import {
  startNavigationProgress,
  stopNavigationProgress,
} from '@mantine/nprogress';
import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

export const Link = forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps<any>>
>(function Link(props, ref) {
  const pathname = usePathname();
  return (
    <NextLink
      ref={ref}
      onClick={() => {
        if (pathname !== props.href) startNavigationProgress();
        else stopNavigationProgress();
      }}
      {...props}
    />
  );
});
