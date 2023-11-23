'use client';

import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';
import { Route } from 'next';
import { Link } from '@/_ui/Link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const links: {
  href: Route;
  label: string;
  tooltip?: string;
  wildcard?: boolean;
}[] = [
  // TODO: Next line should not require a type cast (experimental)
  { href: '/next' as Route, label: '0', tooltip: 'Load asap' },
  { href: '/next/1', label: '1', tooltip: 'Load page 1s' },
  { href: '/next/2', label: '2', tooltip: 'Load page 1s then error' },
  {
    href: '/next/3' as Route,
    wildcard: true,
    label: '3',
    tooltip: 'Load page 1s + inner suspense 1s',
  },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const Links = useMemo(
    () =>
      links.map((link) => (
        <Tooltip key={link.href} label={link.tooltip}>
          <Button
            component={Link}
            href={link.href}
            variant={
              (link.wildcard && pathname.startsWith(link.href)) ||
              pathname === link.href
                ? 'filled'
                : 'outline'
            }
          >
            {link.label}
          </Button>
        </Tooltip>
      )),
    [pathname],
  );
  return (
    <>
      {Links}
      <TextInput
        pb='sm'
        description='Go to /next/3/:slug'
        placeholder='Type a slug here.'
        value={slug}
        onChange={(event) => setSlug(event.currentTarget.value)}
        rightSection={
          <Tooltip label='1s load page + 1s inner suspense'>
            <ActionIcon
              onClick={() => {
                router.push(`/next/3/${slug}` as Route);
              }}
              disabled={slug.length === 0}
            >
              <BsFillArrowRightCircleFill />
            </ActionIcon>
          </Tooltip>
        }
      />
    </>
  );
};
