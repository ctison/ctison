'use client'

import { Box, Navbar as MantineNavBar, Text } from '@mantine/core'

export interface NavBarProps {
  opened: boolean
}

export const NavBar: React.FC<NavBarProps> = ({ opened }) => {
  return (
    <MantineNavBar
      hidden={!opened}
      hiddenBreakpoint='sm'
      width={{ sm: 200, lg: 300 }}
    >
      <Box h='100%' sx={{ backgroundColor: 'pink' }} />
    </MantineNavBar>
  )
}
