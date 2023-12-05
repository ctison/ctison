import { getCV } from '@/_lib/airtable';
import {
  Badge,
  Box,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  TimelineItem,
  Title,
  Tooltip,
} from '@mantine/core';
import { FaRust } from 'react-icons/fa';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { LuHardHat } from 'react-icons/lu';
import { default as Markdown } from 'react-markdown';
import { SiTypescript } from 'react-icons/si';
import { SiSolidity } from 'react-icons/si';
import { IoTerminal } from 'react-icons/io5';
import { SiKubernetes } from 'react-icons/si';
import { IconType } from 'react-icons';

export default async function Page() {
  const cv = await getCV();
  return (
    <Container my='xl' size='sm'>
      <Group justify='space-between'>
        <Title>@ctison</Title>
        <Group gap='sm'>
          <Icon Icon_={IoTerminal} label='Scripting' color='black' />
          <Icon Icon_={FaRust} label='Rust' color='black' />
          <Icon Icon_={SiTypescript} label='Typescript' />
          <Icon Icon_={SiSolidity} label='Solidity' color='violet.6' />
          <Icon Icon_={SiKubernetes} label='Kubernetes' />
        </Group>
      </Group>
      <Text my='xl'>
        Hey, I am an auto didact french developer who loves to read
        documentation of about anything! I have deep interest in finance,
        geopolitics and travels.
      </Text>
      <Timeline mt='md'>
        {cv.map((props, i) => (
          <TimelineItem
            key={i}
            title={<Text fw='bold'>{props.name}</Text>}
            style={{ breakInside: 'avoid' }}
          >
            <Stack gap={4}>
              <Group gap={4} justify='space-between' c='dimmed'>
                <Group gap={4}>
                  <LuHardHat />
                  <Text>{props.role}</Text>
                </Group>
                <Group gap={4}>
                  <IoLocationOutline />
                  <Text>{props.location}</Text>
                </Group>
                <Group gap={4}>
                  <IoCalendarOutline />
                  <Text>{props.date}</Text>
                </Group>
              </Group>
              <Box>
                <Markdown>{props.description}</Markdown>
              </Box>
              <Group gap='sm'>
                {props.badges?.map((badge, i) => (
                  <Badge key={i} variant='outline' color='green'>
                    {badge}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}

const Icon: React.FC<{
  Icon_: IconType;
  label: string;
  color?: string;
  size?: string;
}> = ({ Icon_, label, color, size }) => {
  return (
    <Tooltip label={label}>
      <ThemeIcon variant='white' c={color}>
        <Icon_ size={size ?? '1.3rem'} />
      </ThemeIcon>
    </Tooltip>
  );
};
