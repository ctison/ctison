import { getCV } from '@/_lib/airtable';
import {
  Badge,
  Box,
  Container,
  Group,
  Stack,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from '@mantine/core';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { default as Markdown } from 'react-markdown';

export default async function Page() {
  const cv = await getCV();
  return (
    <Container my='xl' size='sm'>
      <Title>@ctison</Title>
      <Text mt='md'>
        Hey, I am an auto didact french developer who loves to read
        documentation of about anything! I have deep interest in finance,
        geopolitics and travels.
      </Text>
      <Timeline mt='md'>
        {cv.map((props, i) => (
          <TimelineItem key={i} title={<Text fw='bold'>{props.name}</Text>}>
            <Stack gap={4}>
              <Text c='gray.6' fw='semibold'>
                {props.role}
              </Text>
              <Group gap={4} justify='space-between' c='dimmed'>
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
