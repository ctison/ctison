'use client';

import classes from './Spotlight.module.css';

export interface SpotlightProps {}

import {
  Spotlight as MantineSpotlight,
  SpotlightActionData,
} from '@mantine/spotlight';

import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import { IoSearch } from 'react-icons/io5';
import { links } from '../links';

export const Spotlight = memo(function Spotlight() {
  const { push } = useRouter();

  const spotlightActions: SpotlightActionData[] = useMemo(
    () =>
      links.map(
        ({ href, label, Icon }) =>
          ({
            id: href,
            label: label,
            onClick: () => push(href),
            description: href,
            leftSection: <Icon />,
          }) satisfies SpotlightActionData,
      ),
    [push],
  );

  return (
    <MantineSpotlight
      actions={spotlightActions}
      highlightQuery
      nothingFound='Nothing found...'
      classNames={{ content: classes['spotlight-content'] }}
      searchProps={{
        leftSection: <IoSearch fill='var(--mantine-color-placeholder)' />,
        placeholder: 'Search',
      }}
    />
  );
});
