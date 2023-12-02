import { Code } from 'bright';
import { Link } from '@/_ui/Link';
import { Box, Breadcrumbs, Text, Title } from '@mantine/core';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
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
      <Breadcrumbs>
        <Link href='/blog'>Blog</Link>
        <Text>{post.title}</Text>
      </Breadcrumbs>
      <Box component='article' mt='lg'>
        <Title>{post.title}</Title>
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
};
