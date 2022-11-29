import { Component, lazy, Suspense } from 'solid-js'
import '@fontsource/tourney/latin-500.css'
import { A } from '~/components/A'

const Canvas = lazy(() => import('./Canvas'))

const splineURL = '/keyboard.splinecode'

export const Keyboard: Component = () => {
  return (
    <div
      class='relative h-[1024px]'
      style={{
        background:
          'radial-gradient(at 0% 100%, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',
      }}
    >
      <h1
        class='absolute left-2 right-2 top-22 text-7xl text-center text-white  pointer-events-none select-none'
        style={{
          'font-family': 'Tourney',
        }}
      >
        Don't trust the user input
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas splineURL={splineURL} />
      </Suspense>
      <span class='absolute left-2 right-2 bottom-12 text-center text-white'>
        Keyboard made with{' '}
        <A href='https://spline.design' class='text-violet-600'>
          Spline
        </A>
      </span>
    </div>
  )
}
