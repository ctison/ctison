'use client';

import { startNavigationProgress } from '@mantine/nprogress';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

export const Link = forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<NextLinkProps>
>(function Link(props, ref) {
  const pathname = usePathname();
  return (
    <NextLink
      ref={ref}
      onClick={() => {
        if (pathname !== props.href) startNavigationProgress();
      }}
      {...props}
    />
  );
});
