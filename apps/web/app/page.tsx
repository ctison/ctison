'use client';

import { FavoriteTools } from '@/_ui/FavoriteTools';
import { Button, Center } from '@mantine/core';
import dynamic from 'next/dynamic';
import { VscGithub } from 'react-icons/vsc';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Center w='full' h='500'>
        <Button
          component='a'
          target='_blank'
          href='https://github.com/ctison'
          pos='relative'
          variant='outline'
          leftSection={<VscGithub />}
          size='xl'
          ta='center'
        >
          Github
        </Button>
      </Center>
      <FavoriteTools />
      <Spline scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode' />
    </>
  );
}
