'use client';

import {
  Button,
  Modal,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { FramedTitle } from '../FramedTitle';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconAws,
  IconGcloud,
  IconGithub,
  IconKubernetes,
  IconMail,
  IconNextjs,
  IconPostgresql,
  IconPulumi,
  IconReact,
  IconRust,
  IconSolidity,
  IconSurrealdb,
  IconTailwindcss,
  IconTokio,
  IconTypescript,
} from '@/_ui/icons';
import type { IconType } from 'react-icons';
import { FaCalendarPlus as IconCalendarPlus } from 'react-icons/fa';

export interface HeroProps {}

export const Hero: React.FC<Readonly<HeroProps>> = () => {
  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure();
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <>
      <Modal
        opened={isModalOpened}
        onClose={closeModal}
        centered
        size='70%'
        fullScreen={isMobile}
      >
        <Tabs defaultValue='Appointment'>
          <TabsList>
            <TabsTab value='Appointment' leftSection={<IconCalendarPlus />}>
              Appointment
            </TabsTab>
          </TabsList>
          <TabsPanel value='Appointment'>
            <iframe
              // eslint-disable-next-line @eslint-react/dom/no-unsafe-iframe-sandbox
              sandbox='allow-scripts allow-same-origin'
              src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ3PfJSPEIhVxZMG6O_ZNG4AEXWnPZri8_Enaj_C_Lb0FeoUp-xqS71zck_Go-Synn4nD6tw_AeP?gv=true'
              style={{
                border: 0,
                width: '100%',
                height: '70dvh',
              }}
            />
          </TabsPanel>
        </Tabs>
      </Modal>
      <div className='flex h-(--app-min-height) w-full flex-col items-center justify-center'>
        <FramedTitle
          order={2}
          boxProps={{ w: 'fit-content', mx: 'auto', mb: 'xl' }}
        >
          Fullstack developer
        </FramedTitle>
        <div className='flex flex-col items-center gap-1 rounded-md border-gray-500 p-1'>
          <div className='flex gap-1'>
            <Icon Icon={IconRust} label='Rust' color='black' />
            <Icon Icon={IconTokio} label='Tokio' color='black' />
            <Icon Icon={IconTypescript} label='Typescript' />
            <Icon Icon={IconNextjs} label='Next.js' color='black' />
            <Icon Icon={IconReact} label='React' color='blue.6' />
            <Icon Icon={IconTailwindcss} label='Tailwind' color='blue.3' />
            <Icon Icon={IconSolidity} label='Solidity' color='black' />
          </div>
          <div className='flex gap-1'>
            <Icon
              Icon={IconPulumi}
              label='Pulumi'
              color='red.3'
              size='0.95em'
            />
            <Icon Icon={IconKubernetes} label='Kubernetes' color='blue.7' />
            <Icon Icon={IconAws} label='AWS' color='yellow.5' />
            <Icon Icon={IconGcloud} label='Google Cloud' color='black' />
            <Icon Icon={IconSurrealdb} label='SurrealDB' color='purple' />
            <Icon Icon={IconPostgresql} label='PostgreSQL' color='blue.8' />
          </div>
        </div>
        <div className='mt-5 grid grid-cols-2 gap-1'>
          <Button
            component='a'
            href='https://github.com/ctison'
            rel='noreferrer'
            target='_blank'
            variant='outline'
            color='black'
            leftSection={<IconGithub />}
          >
            Github
          </Button>
          <Button
            component='a'
            href='mailto:ctison@pm.me'
            variant='outline'
            color='black'
            leftSection={<IconMail />}
          >
            Email
          </Button>
        </div>

        <div className='mt-6'>
          <Tooltip label='Satisfaction guaranteed'>
            <Button
              onClick={openModal}
              variant='outline'
              size='xl'
              radius='xl'
              color='green'
              mt='md'
            >
              Hire me
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

const Icon: React.FC<{
  Icon: IconType;
  label: string;
  color?: string;
  size?: string;
}> = ({ Icon: _Icon, label, color, size }) => {
  return (
    <Tooltip label={label}>
      <ThemeIcon variant='white' c={color}>
        <_Icon size={size ?? '2rem'} />
      </ThemeIcon>
    </Tooltip>
  );
};
