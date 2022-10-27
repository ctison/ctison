import { Navbar as MantineNavBar, Text } from '@mantine/core'

export interface NavBarProps {
  opened: boolean
}

export const NavBar: React.FC<NavBarProps> = ({ opened }) => {
  return (
    <MantineNavBar hidden={opened} hiddenBreakpoint='sm'>
      <Text>Application Navbar</Text>
    </MantineNavBar>
  )
}
