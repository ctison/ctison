'use client';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Spline scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode' />
    </>
  );
}
