import { Link } from '@/_ui/Link';
import {
  Badge,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { allPosts } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { RssButton } from './RssButton';

export default function Blog() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <>
      <Title ta='center' my='xl'>
        Blog
        <RssButton />
      </Title>
      <SimpleGrid cols={{ base: 2, md: 2, lg: 3 }}>
        {posts.map((post) => (
          <Card key={post._id} withBorder radius='md' p={0} shadow='md'>
            <Link href={post.url} style={{ textDecoration: 'none' }}>
              <Image
                src={post.image}
                alt={`${post.title} header image`}
                h={130}
              />
              <Stack gap={0} pt='sm' pb='md' px='md'>
                <Text fw='bold'>{post.title}</Text>
                <Text c='dimmed' size='sm'>
                  {format(parseISO(post.date), 'LLLL d, yyyy')}
                </Text>
                <Group gap={4} mt={5}>
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant='outline' color='green' size='sm'>
                      #{tag}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
