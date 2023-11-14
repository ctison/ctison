'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { use } from 'react';
import { generateStaticParams } from './page';

export const Slugs: React.FC = () => {
  const slugs = use(generateStaticParams());
  return (
    <CodeHighlight
      lang='json'
      code={JSON.stringify(slugs, undefined, 2)}
      miw='min(100%, 500px)'
    />
  );
};
