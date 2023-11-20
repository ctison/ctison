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
import { ConnectWallet } from '@thirdweb-dev/react';
import { type Route } from 'next';
import { MuseoModerno } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

const links: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/web3', label: 'Web3 tools' },
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
          <Group>
            <ConnectWallet />
          </Group>
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
