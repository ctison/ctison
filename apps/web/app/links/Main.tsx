'use client';

import {
  Anchor,
  CloseButton,
  Container,
  List,
  ListItem,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';

export const Main: React.FC<{ links: Record<string, string[]> }> = ({
  links,
}) => {
  const searchParams = useSearchParams()!;
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const filteredLinks = useMemo(() => {
    if (search === '') return links;
    const searchLower = search.toLowerCase();
    return Object.fromEntries(
      Object.entries(links).filter(([title, links]) => {
        if (title.toLowerCase().includes(searchLower)) return true;
        return links.some((link) => link.toLowerCase().includes(searchLower));
      }),
    );
  }, [links, search]);

  return (
    <Container my='xl' size='xs'>
      <Stack gap='xl' mt='lg'>
        <Title ta='center'>Awesome Links</Title>
        <TextInput
          placeholder='Filter links...'
          leftSection={<IoSearch fill='var(--mantine-color-placeholder)' />}
          rightSection={
            <CloseButton
              aria-label='Clear search'
              display={!search.length ? 'none' : undefined}
              onClick={() => setSearch('')}
            />
          }
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Stack>
          {Object.entries(filteredLinks)
            .toSorted(([a], [b]) => a.localeCompare(b))
            .map(([title, links]) => (
              <Section key={title} title={title} links={links} />
            ))}
        </Stack>
      </Stack>
    </Container>
  );
};

const Section: React.FC<{ title: string; links: string[] }> = ({
  title,
  links,
}) => (
  <>
    <Anchor
      size='1.5rem'
      fw='semibold'
      c='gray.8'
      tt='capitalize'
      id={title}
      href={`#${title}`}
    >
      {title}
    </Anchor>
    <List>
      {links.map((link) => (
        <ListItem key={link}>
          <Anchor href={link} referrerPolicy='no-referrer' target='_blank'>
            {link}
          </Anchor>
        </ListItem>
      ))}
    </List>
  </>
);
