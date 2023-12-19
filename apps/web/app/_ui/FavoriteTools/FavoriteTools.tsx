import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { FramedTitle } from '../FramedTitle';
import { favoriteTools, toolColor } from './data';

export const FavoriteTools: React.FC = () => {
  return (
    <Container my='xl'>
      <FramedTitle
        order={2}
        boxProps={{ w: 'fit-content', mx: 'auto', mb: 'xl' }}
      >
        Favorite Tools
      </FramedTitle>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {favoriteTools.map((tool) => (
          <Card
            key={tool.name}
            withBorder
            p='lg'
            radius='md'
            shadow='sm'
            className='print-avoid-break'
          >
            <Group justify='space-between'>
              <Text fw={500}>{tool.name}</Text>
              <Badge color={toolColor[tool.category]} variant='light'>
                {tool.category}
              </Badge>
            </Group>
            <Stack justify='space-between' h='100%'>
              <Text size='sm' c='dimmed' mt='md'>
                {tool.description}.
              </Text>
              <Button
                component='a'
                href={tool.link}
                target='_blank'
                variant='light'
                referrerPolicy='no-referrer'
                color='blue.4'
                fullWidth
                mt='xs'
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
