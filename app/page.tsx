'use client';
import { Anchor, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding='md'
      >
        <AppShell.Header>
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
        </AppShell.Header>

        <AppShell.Navbar p='md'>Navbar</AppShell.Navbar>

        <AppShell.Main
          classNames={{
            main: 'relative h-[1024px]',
          }}
        >
          <Spline scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode' />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
