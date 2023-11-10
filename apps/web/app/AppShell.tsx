'use client';

import {
  Anchor,
  Burger,
  Group,
  AppShell as MantineAppShell,
  NavLink,
  em,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MuseoModerno } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

const links: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/bridge', label: 'Bridge' },
];

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile, close: closeNavbar }] =
    useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const pathname = usePathname();

  useEffect(() => {
    closeNavbar();
  }, [pathname, closeNavbar]);

  return (
    <MantineAppShell
      header={{ height: { base: 64, sm: 76, lg: 76 } }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !mobileOpened },
      }}
      padding='md'
    >
      <MantineAppShell.Header withBorder={true}>
        <Group justify='space-between' h='100%' px='md'>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              // hiddenFrom='sm'
              size='sm'
            />
            <Anchor
              component={Link}
              href='/'
              className={brandFont.className}
              size={isMobile ? '1.5rem' : '2rem'}
              c='black'
            >
              @ctison
            </Anchor>
          </Group>
          <ConnectButton
            chainStatus='icon'
            showBalance={false}
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
          />
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>
        {links.map(({ href, label }) => (
          <NavLink
            key={href}
            component={Link}
            href={href}
            label={label}
            variant={pathname === href ? undefined : 'subtle'}
            active
          />
        ))}
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};
