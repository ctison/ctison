'use client';

import {
  Anchor,
  Burger,
  Group,
  AppShell as MantineAppShell,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: true },
      }}
      padding='md'
    >
      <MantineAppShell.Header withBorder={false}>
        <Group justify='space-between' h='100%' px='md'>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom='sm'
              size='sm'
            />
            <Anchor href='/'>@ctison</Anchor>
          </Group>
          <ConnectButton chainStatus='icon' />
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p='md' bg='orange'></MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};
