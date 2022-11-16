'use client'

import {
  Anchor,
  Burger,
  Grid,
  Group,
  Header as MantineHeader,
  MediaQuery,
} from '@mantine/core'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { FaDev } from 'react-icons/fa'
import { SiElement, SiGithub } from 'react-icons/si'
import { HeaderButton } from './HeaderButton'

export interface HeaderProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ opened, setOpened }) => {
  return (
    <MantineHeader
      height={60}
      withBorder={false}
      px='md'
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Grid align='center' justify='space-between' h='100%' m={0}>
        <Group>
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size='sm'
              mr='xl'
            />
          </MediaQuery>
          <Link href='/' passHref legacyBehavior>
            <Anchor color='yellow.5' weight='bold' size='xl' underline={false}>
              @ctison
            </Anchor>
          </Link>
        </Group>
        <Group spacing='xs'>
          <HeaderButton href='https://github.com/ctison'>
            <SiGithub size={20} />
          </HeaderButton>
          <HeaderButton href='https://dev.to/ctison'>
            <FaDev size={20} />
          </HeaderButton>
          <HeaderButton href='https://matrix.to/#/@ctison:matrix.org'>
            <SiElement size={20} />
          </HeaderButton>
        </Group>
      </Grid>
    </MantineHeader>
  )
}
