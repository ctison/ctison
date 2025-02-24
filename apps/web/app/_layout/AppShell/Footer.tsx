import { IconClipboard, IconDeBank, IconGithub, IconMail } from '@/_ui/icons';
import {
  ActionIcon,
  Center,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

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
            <IconGithub />
          </FooterIcon>
          <FooterIcon
            tooltip='DeBank'
            href='https://debank.com/profile/0x6ee4696cd792ec25a28b5cc1ba22b71fd2f3a1dd'
          >
            <IconDeBank />
          </FooterIcon>
          <FooterIcon tooltip='ctison@pm.me' copy='ctison@pm.me'>
            <IconMail size='1.2rem' />
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
  Readonly<
    React.PropsWithChildren<{ href?: string; tooltip: string; copy?: string }>
  >
> = ({ tooltip, href, children, copy }) => {
  const clipboard = useClipboard();

  return (
    <Popover position='right' opened={clipboard.copied} withArrow shadow='xl'>
      <PopoverTarget>
        <Tooltip label={tooltip}>
          <ActionIcon
            component='a'
            href={href}
            target='_blank'
            referrerPolicy='no-referrer'
            variant='subtle'
            color='black'
            onClick={() => {
              if (copy) clipboard.copy(copy);
            }}
          >
            {children}
          </ActionIcon>
        </Tooltip>
      </PopoverTarget>
      <PopoverDropdown>
        <Group gap={2}>
          <ThemeIcon variant='transparent' c='teal.5'>
            <IconClipboard />
          </ThemeIcon>
          <Text>Copied to clipboard</Text>
        </Group>
      </PopoverDropdown>
    </Popover>
  );
};
