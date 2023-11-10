'use client';

import { Center, Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

const Widget = dynamic(() => import('./Widget').then((mod) => mod.Widget), {
  ssr: false,
  loading: () => (
    <Center h={600}>
      <Loader />
    </Center>
  ),
});

export default function Bridge() {
  return <Widget />;
}
