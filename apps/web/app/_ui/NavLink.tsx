'use client';

import { forwardRef } from 'react';
import {
  NavLink as MantineNavLink,
  NavLinkProps as MantineNavLinkProps,
} from '@mantine/core';
import { Link } from './Link';
import { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { startNavigationProgress } from '@mantine/nprogress';

export const NavLink = forwardRef<
  HTMLAnchorElement,
  MantineNavLinkProps & LinkProps
>(function NavLink(props, ref) {
  const pathname = usePathname();

  return (
    <MantineNavLink
      onClick={() => {
        if (pathname !== props.href) startNavigationProgress();
      }}
      component={Link}
      ref={ref}
      {...props}
    />
  );
});
