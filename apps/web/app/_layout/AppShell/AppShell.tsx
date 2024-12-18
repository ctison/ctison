'use client';

import { Link } from '@/_ui/Link';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  AppShell as MantineAppShell,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';

import { NoSsrWeb3WalletButton } from '@/_ui/Web3WalletButton';
import { MuseoModerno } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { IoMdClose as IconClose } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import {
  LuPanelLeftClose as IconCloseLeftPanel,
  LuPanelLeftOpen as IconOpenLeftPanel,
} from 'react-icons/lu';
import { Footer } from './Footer';
import { links } from './links';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

export interface AppShellProps extends React.PropsWithChildren {}

export const AppShell: React.FC<Readonly<AppShellProps>> = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] =
    useDisclosure(!isMobile);

  const pathname = usePathname();

  useEffect(() => {
    if (isMobile) {
      closeNavbar();
    }
  }, [isMobile, closeNavbar]);

  return (
    <>
      <MantineAppShell
        header={{ height: { base: 64, sm: 76, lg: 76 } }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !navbarOpened, desktop: !navbarOpened },
        }}
        style={{
          '--app-footer-height': '100px',
          '--app-main-min-height': 'calc(100dvh - var(--app-footer-height))',
          '--app-min-height':
            'calc(var(--app-main-min-height) - var(--app-shell-header-height))',
        }}
      >
        {/* HEADER */}
        {useMemo(
          () => (
            <MantineAppShell.Header withBorder={true}>
              <Group justify='space-between' h='100%' px='md'>
                <Group>
                  <ActionIcon
                    onClick={toggleNavbar}
                    variant='subtle'
                    color='black'
                    size='md'
                    style={{
                      alignSelf: 'flex-end',
                    }}
                    aria-label={navbarOpened ? 'Close navbar' : 'Open navbar'}
                  >
                    {navbarOpened ? (
                      <IconCloseLeftPanel size='100%' />
                    ) : (
                      <IconOpenLeftPanel size='100%' />
                    )}
                  </ActionIcon>
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
                {navbarOpened && isMobile && (
                  <ActionIcon
                    onClick={toggleNavbar}
                    variant='subtle'
                    color='black'
                    size='md'
                    aria-label='Close navbar'
                  >
                    <IconClose size='100%' />
                  </ActionIcon>
                )}
              </Group>
            </MantineAppShell.Header>
          ),
          [navbarOpened, toggleNavbar, isMobile],
        )}

        {/* NAVBAR */}
        {useMemo(
          () => (
            <MantineAppShell.Navbar>
              <MantineAppShell.Section grow>
                <Stack p='sm'>
                  <NoSsrWeb3WalletButton />
                  <Button
                    onClick={() => {
                      spotlight.open();
                    }}
                    variant='default'
                    mih='40px'
                    radius='md'
                    styles={{
                      label: { color: 'var(--mantine-color-placeholder)' },
                    }}
                    leftSection={
                      <IoSearch fill='var(--mantine-color-placeholder)' />
                    }
                    rightSection={
                      <Text
                        fw={700}
                        c='gray.7'
                        size='calc(.6875rem*var(--mantine-scale))'
                        style={{
                          border: 'solid 1px lightgray',
                          borderRadius: '5px',
                        }}
                        p='4px 7px'
                      >
                        Ctrl + K
                      </Text>
                    }
                  >
                    Search
                  </Button>
                </Stack>
                {links.map(({ href, label, Icon, startsWith }) => {
                  const active = startsWith
                    ? pathname.startsWith(href)
                    : pathname === href;
                  return (
                    <Anchor component={Link} key={href} href={href}>
                      <NavLink
                        component='span'
                        label={label}
                        active={active}
                        leftSection={<Icon />}
                        c={active ? undefined : 'gray.7'}
                      />
                    </Anchor>
                  );
                })}
              </MantineAppShell.Section>
            </MantineAppShell.Navbar>
          ),
          [pathname],
        )}

        {/* MAIN */}
        <MantineAppShell.Main mih={`var(--app-main-min-height)`}>
          {children}
        </MantineAppShell.Main>
        <Footer />
      </MantineAppShell>
    </>
  );
};
