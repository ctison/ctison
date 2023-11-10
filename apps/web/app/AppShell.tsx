'use client';

import {
  Anchor,
  Burger,
  Group,
  AppShell as MantineAppShell,
} from '@mantine/core';
import { MuseoModerno } from 'next/font/google';
import { useDisclosure } from '@mantine/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: { base: 48, sm: 76, lg: 76 } }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: true },
      }}
      padding='md'
    >
      <MantineAppShell.Header withBorder={true} bg='transparent'>
        <Group justify='space-between' h='100%' px='md'>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom='sm'
              size='sm'
            />
            <Anchor
              component={Link}
              href='/'
              className={brandFont.className}
              size='2rem'
              c='black'
            >
              @ctison
            </Anchor>
          </Group>
          <ConnectButton chainStatus='icon' />
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p='md' bg='orange'></MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};
