'use client';

import { Link } from '@/_ui/Link';
import {
  Anchor,
  Burger,
  Button,
  Group,
  AppShell as MantineAppShell,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { useDidUpdate, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react';
import { type Route } from 'next';
import { MuseoModerno } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { IconType } from 'react-icons';
import { FaEthereum } from 'react-icons/fa';
import { IoHome, IoSearch } from 'react-icons/io5';
import { SiNextdotjs } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

const links: {
  href: Route;
  label: string;
  Icon: IconType;
  startsWith?: boolean;
}[] = [
  { href: '/', label: 'Home', Icon: IoHome },
  { href: '/web3', label: 'Web3', Icon: FaEthereum },
  {
    href: '/next' as Route,
    label: 'Next Example',
    Icon: SiNextdotjs,
    startsWith: true,
  },
];

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] =
    useDisclosure(!isMobile);
  const [asideOpened, { toggle: toggleAside, close: closeAside }] =
    useDisclosure(!isMobile);

  const pathname = usePathname();
  const connectionStatus = useConnectionStatus();
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

  useEffect(() => {
    if (isMobile) {
      closeNavbar();
      closeAside();
    }
  }, [isMobile, closeNavbar, closeAside]);

  return (
    <>
      <Spotlight
        actions={spotlightActions}
        highlightQuery
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
      >
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

        <MantineAppShell.Aside withBorder>
          <Stack p='sm'>
            <ConnectWallet
              style={{
                height: connectionStatus === 'connected' ? '56px' : '42px',
                minWidth: isMobile ? 'unset' : '142px',
                borderRadius: 10,
              }}
            />
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

        <MantineAppShell.Main>{children}</MantineAppShell.Main>
      </MantineAppShell>
    </>
  );
};
