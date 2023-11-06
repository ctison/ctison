'use client';
import { FavoriteTools } from '@/app/FavoriteTools';
import { Button, Center, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
import { VscGithub } from 'react-icons/vsc';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Center my='xl'>
        <Text size='64px' fw={900}>
          Hey,
          <br />
          {"I'm Charles Tison"}
        </Text>
      </Center>
      <Center my='xl'>
        <Button variant='outline' leftSection={<VscGithub />} size='lg'>
          Github
        </Button>
      </Center>
      <FavoriteTools />
      <Spline scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode' />
    </>
  );
}
