'use client';
import {
  Anchor,
  AppShell as MantineAppShell,
  Burger,
  Group,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  const pathname = usePathname();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='md'
    >
      <MantineAppShell.Header>
        <Group h='100%' px='md'>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom='sm'
            size='sm'
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom='sm'
            size='sm'
          />
          <Anchor href='/'>@ctison</Anchor>
        </Group>
        <ConnectButton chainStatus='icon' />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p='md'>
        <Link href='/mint'>Mint</Link>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main
        classNames={{
          main: 'relative h-[1024px]',
        }}
      >
        {children}
      </MantineAppShell.Main>
    </MantineAppShell>
  );
};
