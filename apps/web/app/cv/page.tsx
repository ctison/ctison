import {
  Badge,
  Container,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Timeline,
  TimelineItem,
  Title,
} from '@mantine/core';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

export default function Page() {
  return (
    <Container my='xl' size='sm'>
      <Title>@ctison</Title>
      <Text mt='md'>
        Hey, I am an auto didact french developer who loves to read
        documentation of about anything! I have deep interest in finance,
        geopolitics and travels.
      </Text>
      <Timeline mt='md'>
        {workedAt.map((props, i) => (
          <TimelineItem key={i} title={<Text fw='bold'>{props.title}</Text>}>
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
              <Stack gap={5} my='md' justify='flex-start' align='flex-start'>
                {props.description}
              </Stack>
              <Group gap='sm'>
                {props.badges.map((badge, i) => (
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

interface WorkedAtProps {
  title: string;
  role: string;
  location: string;
  date: string;
  description: React.ReactNode;
  badges: string[];
}

const workedAt: WorkedAtProps[] = [
  {
    title: '42 School',
    role: 'Student',
    location: 'Paris, France',
    date: '2014-2019 (~5 years)',
    description: (
      <>
        Learn 2 Code
        <List>
          <ListItem mt={4}>
            Write a bunch of more or less meaningful projects
          </ListItem>
          <ListItem>Read a astonishing amount of documentations</ListItem>
          <ListItem>Play CTF</ListItem>
        </List>
      </>
    ),
    badges: [
      'Shell',
      'Algorithms',
      'C',
      'C++',
      'PHP',
      'Javascript',
      'Typescript',
      'Python',
      'Ruby',
      'Swift',
      'C#',
      'Java',
      'OCaml',
      'Golang',
      'Linux',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'AWS',
      'GCP',
    ],
  },
  {
    title: 'Cloudskiff',
    role: 'Intern Devops',
    location: 'Station F, Paris, France',
    date: '2019-2020 (6 months)',
    description: (
      <>
        Cloudskiff was a startup with for objective to be a Terraform Cloud.
        <List>
          <ListItem mt={4}>
            Write infrastructure as code with Terraform and Kubernetes on AWS
          </ListItem>
          <ListItem>Write CI/CD on Buddy CI</ListItem>
        </List>
      </>
    ),
    badges: [
      'Terraform',
      'AWS',
      'Kubernetes',
      'Docker',
      'Typescript',
      'Node.js',
      'Next.js',
      'MongoDB',
      'Golang',
      'CNCF',
    ],
  },
  {
    title: 'Outmind',
    role: 'Devops',
    location: 'Station F, Paris, France',
    date: '2020-2022 (~2 years)',
    description: (
      <>
        Outmind is a SaaS that enables to connect other SaaS in order to
        privately search among them.
        <List>
          <ListItem mt={4}>
            Write infrastructure as code with Pulumi and Kubernetes on AWS
          </ListItem>
          <ListItem>Write CI/CD on Github Actions</ListItem>
          <ListItem>Instrument services with Elastic APM</ListItem>
          <ListItem>Manage data on Elasticsearch and Postgres</ListItem>
          <ListItem>Develop Nest.js services</ListItem>
        </List>
      </>
    ),
    badges: [
      'Github Actions',
      'Pulumi',
      'AWS',
      'Kubernetes',
      'Docker',
      'Typescript',
      'Node.js',
      'React',
      'Postgres',
      'Elasticsearch',
      'Kibana',
      'CNCF',
    ],
  },
  {
    title: 'Soap',
    role: 'Devops',
    location: 'Remote',
    date: '2023 (7 months)',
    description: (
      <>
        Soap is a startup that aimed to fetch data from NFT marketplaces.
        <List>
          <ListItem mt={4}>
            Write infrastructure as code with Pulumi and Kubernetes on GCP
          </ListItem>
          <ListItem>Write CI/CD on Github Actions</ListItem>
          <ListItem>Instrument services with OpenTelemetry</ListItem>
          <ListItem>Develop services in Typescript and Rust</ListItem>
          <ListItem>Manage data on Redis and Postgres</ListItem>
          <ListItem>
            Develop monitoring dashboards on Kibana and Grafana
          </ListItem>
        </List>
      </>
    ),
    badges: [
      'Pulumi',
      'GCP',
      'Kubernetes',
      'Docker',
      'Bun.sh',
      'Typescript',
      'Postgres',
      'Rust',
      'Web3',
      'OpenTelemetry',
      'Elasticsearch',
      'Kibana',
      'Grafana',
      'CNCF',
    ],
  },
].reverse();
