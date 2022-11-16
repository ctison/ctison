'use client'

import {
  AppShell as MantineAppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
} from '@mantine/core'
import { useHotkeys, useToggle } from '@mantine/hooks'
import React, { useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header/Header'

export const AppShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>([
    'light',
    'dark',
  ])
  useHotkeys([['mod+J', () => toggleColorScheme()]])
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
        }}
      >
        <MantineAppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              boxShadow: '0px 5px 15px 5px #aaa',
            },
          }}
          navbarOffsetBreakpoint='sm'
          asideOffsetBreakpoint='sm'
          header={<Header opened={opened} setOpened={setOpened} />}
          // navbar={<NavBar opened={opened} />}
          // footer={<Footer />}
          padding={0}
          fixed={false}
        >
          {children}
        </MantineAppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
