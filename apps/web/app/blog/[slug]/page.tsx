import { Badge, Box, Group, Image, Space, Text, Title } from '@mantine/core';
import { Code } from 'bright';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { MDXComponents } from 'mdx/types';
import { Metadata } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: allPosts.find((post) => post._raw.flattenedPath === slug)?.title,
  };
}

export default function BlogPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Box component='article' mt='lg'>
        {post.image && (
          <Image
            src={post.image}
            alt={`${post.title} header image`}
            radius='sm'
          />
        )}
        <Group justify='space-between' mt='xl'>
          <Title>{post.title}</Title>
          {post.tags && (
            <Group>
              {post.tags?.map((tag, i) => (
                <Badge variant='outline' color='green' key={i}>
                  #{tag}
                </Badge>
              ))}
            </Group>
          )}
        </Group>
        <Text component='time' c='dimmed'>
          Posted on {format(parseISO(post.date), 'LLLL d, yyyy')}
        </Text>
        <Space h='md' />
        <MDXContent components={mdxComponents} />
      </Box>
    </>
  );
}

const mdxComponents: MDXComponents = {
  pre: (props) => (
    <Code
      lineNumbers
      theme='github-dark-dimmed'
      style={{
        border: '1px solid #e1e1e1',
      }}
      {...props}
    />
  ),
  // @ts-expect-error
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props) => <Image {...props} />,
  a: (props) => <a {...props} target='_blank' referrerPolicy='no-referrer' />,
};
