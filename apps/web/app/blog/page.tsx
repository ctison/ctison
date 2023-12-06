import { List, ListItem, Title } from '@mantine/core';
import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { Link } from '@/_ui/Link';

export default function Blog() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <>
      <Title>Blog</Title>
      <List mt='md'>
        {posts.map((post) => (
          <ListItem key={post.title}>
            <Link href={post.url}>{post.title}</Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}
