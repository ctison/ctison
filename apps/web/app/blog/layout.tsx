import { Container } from '@mantine/core';

export const metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog | @ctison',
  },
};

export default function Layout({ children }: React.PropsWithChildren) {
  return <Container my='md'>{children}</Container>;
}
