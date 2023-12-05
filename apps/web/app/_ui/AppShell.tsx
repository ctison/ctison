'use client';

import { Link } from '@/_ui/Link';
import {
  Anchor,
  Burger,
  Button,
  Group,
  AppShell as MantineAppShell,
  NavLink,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  Spotlight as MantineSpotlight,
  SpotlightActionData,
  spotlight,
} from '@mantine/spotlight';

import { type Route } from 'next';
import dynamic from 'next/dynamic';
import { MuseoModerno } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useEffect, useMemo } from 'react';
import { IconType } from 'react-icons';
import { BiWorld } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import { IoHome, IoSearch } from 'react-icons/io5';
import { TiRss } from 'react-icons/ti';
import { VscGithub } from 'react-icons/vsc';
import { Footer } from './Footer';

const Web3ConnectButton = dynamic(
  () => import('./Web3WalletButton').then((m) => m.Web3WalletButton),
  { ssr: false, loading: () => <Skeleton h={42} /> },
);

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

const links: {
  href: Route;
  label: string;
  Icon: IconType;
  startsWith?: boolean;
}[] = [
  { href: '/', label: 'Home', Icon: IoHome },
  { href: '/web3', label: 'Web3', Icon: FaEthereum },
  { href: '/blog', label: 'Blog', Icon: TiRss, startsWith: true },
  { href: '/links', label: 'Links', Icon: FaLink },
  { href: '/data/france', label: 'Data', Icon: BiWorld, startsWith: true },
];

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] =
    useDisclosure(!isMobile);
  const [asideOpened, { toggle: toggleAside, close: closeAside }] =
    useDisclosure(!isMobile);

  const pathname = usePathname();

  useEffect(() => {
    if (isMobile) {
      closeNavbar();
      closeAside();
    }
  }, [isMobile, closeNavbar, closeAside]);

  return (
    <>
      <Spotlight />
      <MantineAppShell
        header={{ height: { base: 64, sm: 76, lg: 76 } }}
        navbar={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !navbarOpened, desktop: !navbarOpened },
        }}
        aside={{
          width: 200,
          breakpoint: 'sm',
          collapsed: { mobile: !asideOpened, desktop: !asideOpened },
        }}
        style={{
          '--app-footer-height': '200px',
        }}
      >
        {/* HEADER */}
        {useMemo(
          () => (
            <MantineAppShell.Header withBorder={true}>
              <Group justify='space-between' h='100%' px='md'>
                <Group>
                  <Burger
                    opened={navbarOpened}
                    onClick={toggleNavbar}
                    size='sm'
                    // hiddenFrom='sm'
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
                <Group align='stretch'>
                  <Burger
                    opened={asideOpened}
                    onClick={toggleAside}
                    size='sm'
                    // hiddenFrom='md'
                  />
                </Group>
              </Group>
            </MantineAppShell.Header>
          ),
          [navbarOpened, toggleNavbar, asideOpened, toggleAside, isMobile],
        )}

        {/* NAVBAR */}
        {useMemo(
          () => (
            <MantineAppShell.Navbar>
              <MantineAppShell.Section grow>
                <Stack p='sm'>
                  <Button
                    onClick={() => spotlight.open()}
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

        {/* ASIDE */}
        {useMemo(
          () => (
            <MantineAppShell.Aside withBorder>
              <Stack p='sm'>
                <Web3ConnectButton />
                <Button
                  component='a'
                  target='_blank'
                  href='https://github.com/ctison'
                  variant='outline'
                  leftSection={<VscGithub />}
                  ta='center'
                >
                  Github
                </Button>
              </Stack>
            </MantineAppShell.Aside>
          ),
          [],
        )}

        {/* MAIN */}
        <MantineAppShell.Main mih={`calc(100dvh - var(--app-footer-height))`}>
          {children}
        </MantineAppShell.Main>
        <Footer />
      </MantineAppShell>
    </>
  );
};

export const Spotlight = memo(function Spotlight() {
  const router = useRouter();

  const spotlightActions: SpotlightActionData[] = useMemo(
    () =>
      links.map(
        ({ href, label, Icon }) =>
          ({
            id: href,
            label: label,
            onClick: () => router.push(href),
            description: href,
            leftSection: <Icon />,
          }) satisfies SpotlightActionData,
      ),
    [router],
  );
  return (
    <MantineSpotlight
      actions={spotlightActions}
      highlightQuery
      nothingFound='Nothing found...'
      styles={{
        content: {
          border: 'solid 1px grey',
        },
      }}
      searchProps={{
        leftSection: <IoSearch fill='var(--mantine-color-placeholder)' />,
        placeholder: 'Search',
      }}
    />
  );
});
