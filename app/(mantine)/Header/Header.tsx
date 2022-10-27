'use client'

import {
  Burger,
  Grid,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { SiElement, SiGithub } from 'react-icons/si'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { HeaderButton } from './HeaderButton'
import sharinganImage from './sharingan.png'

export interface HeaderProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ opened, setOpened }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <MantineHeader height={60} withBorder={false} p='md'>
      <Grid align='center' justify='space-between' sx={{ height: '100%' }}>
        <Group>
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened(o => !o)}
              size='sm'
              mr='xl'
            />
          </MediaQuery>
          <Link href='/'>
            <Image src={sharinganImage} alt='' width={42} />
          </Link>
        </Group>
        <Group spacing='xs'>
          <Text
            component='a'
            href='https://dev.to/ctison'
            target='_blank'
            rel='noreferrer'
            sx={{
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Blog
          </Text>
          <HeaderButton href='https://github.com/ctison'>
            <SiGithub size={20} />
          </HeaderButton>
          <HeaderButton href='https://matrix.to/#/@ctison:matrix.org'>
            <SiElement size={20} />
          </HeaderButton>
          <HeaderButton onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? (
              <RiSunLine size={20} />
            ) : (
              <RiMoonClearLine size={20} />
            )}
          </HeaderButton>
        </Group>
      </Grid>
    </MantineHeader>
  )
}
