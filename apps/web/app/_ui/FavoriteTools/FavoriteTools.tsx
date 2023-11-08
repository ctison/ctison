'use client';
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { favoriteTools } from './data';

export const FavoriteTools: React.FC = () => {
  return (
    <Container my='xl'>
      <Title order={2} mb='md' ta='center'>
        Favorite Tools
      </Title>
      <SimpleGrid cols={3}>
        {favoriteTools.map((tool) => (
          <Card key={tool.name} withBorder p='lg' radius='md' shadow='sm'>
            <Group justify='space-between'>
              <Text fw={500}>{tool.name}</Text>
              <Badge color='pink' variant='light'>
                {tool.category}
              </Badge>
            </Group>
            <Stack justify='space-between' h='100%'>
              <Text size='sm' c='dimmed'>
                {tool.description}
              </Text>
              <Button
                component='a'
                href={tool.link}
                target='_blank'
                variant='light'
                color='blue'
                fullWidth
                mt='md'
                radius='md'
              >
                Visit Website
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
