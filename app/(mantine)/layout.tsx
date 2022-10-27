'use client'

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useToggle } from '@mantine/hooks'
import { useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>([
    'light',
    'dark',
  ])
  useHotkeys([['mod+J', () => toggleColorScheme()]])
  const [opened, setOpened] = useState(false)
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
        <AppShell
          header={<Header opened={opened} setOpened={setOpened} />}
          // navbar={<NavBar opened={opened} />}
          footer={<Footer />}
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
