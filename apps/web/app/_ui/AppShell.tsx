'use client';

import {
  Anchor,
  Box,
  Burger,
  Button,
  Group,
  AppShell as MantineAppShell,
  NavLink,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react';
import { type Route } from 'next';
import { MuseoModerno } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { IoSearch } from 'react-icons/io5';

const brandFont = MuseoModerno({ subsets: ['latin'], weight: '600' });

const links: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/web3', label: 'Web3' },
];

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile, close: closeNavbar }] =
    useDisclosure();
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const pathname = usePathname();
  const connectionStatus = useConnectionStatus();
  const router = useRouter();

  const spotlightActions: SpotlightActionData[] = useMemo(
    () =>
      links.map(
        (link) =>
          ({
            id: link.href,
            label: link.label,
            onClick: () => router.push(link.href),
            description: link.href,
          }) satisfies SpotlightActionData,
      ),
    [router],
  );

  useEffect(() => {
    closeNavbar();
  }, [pathname, closeNavbar]);

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
            <Group align='stretch'>
              <Box visibleFrom='xs'>
                <Button
                  onClick={() => spotlight.open()}
                  variant='default'
                  h='100%'
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
              </Box>
              <ConnectWallet
                style={{
                  height: connectionStatus === 'connected' ? '56px' : '42px',
                  minWidth: isMobile ? 'unset' : '142px',
                }}
              />
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
    </>
  );
};
