import {
  ActionIcon,
  Box,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { VscGithub } from 'react-icons/vsc';
import { DeBankMono } from 'react-web3-icons';

export const Footer: React.FC = () => {
  return (
    <Center
      component='footer'
      h='var(--app-footer-height)'
      style={{
        borderTop: '1px solid var(--mantine-color-gray-2)',
        transitionProperty: 'padding',
      }}
      maw='100%'
      pl='var(--_main-padding-left, calc(var(--app-shell-navbar-offset, 0px) + var(--app-shell-padding)))'
      pr='var(--_main-padding-right, calc(var(--app-shell-aside-offset, 0px) + var(--app-shell-padding)))'
    >
      <Stack h='100%' mx='auto' gap={5} justify='center'>
        <Group gap='xs'>
          <FooterIcon tooltip='Github' href='https://github.com/ctison/ctison'>
            <VscGithub />
          </FooterIcon>
          <FooterIcon
            tooltip='DeBank'
            href='https://debank.com/profile/0x6ee4696cd792ec25a28b5cc1ba22b71fd2f3a1dd'
          >
            <DeBankMono />
          </FooterIcon>
        </Group>
        <Text size='sm' ta='center'>
          © {new Date().getFullYear()}
        </Text>
      </Stack>
    </Center>
  );
};

const FooterIcon: React.FC<
  React.PropsWithChildren<{ href: string; tooltip: string }>
> = ({ tooltip, href, children }) => (
  <Tooltip label={tooltip}>
    <ActionIcon
      component='a'
      href={href}
      target='_blank'
      referrerPolicy='no-referrer'
      variant='subtle'
      color='black'
    >
      {children}
    </ActionIcon>
  </Tooltip>
);
