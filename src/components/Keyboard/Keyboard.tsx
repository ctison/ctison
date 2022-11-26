import { Component, lazy, Suspense } from 'solid-js'
import '@fontsource/tourney'

const Canvas = lazy(() => import('./Canvas'))

const splineURL = '/keyboard.splinecode'

export const Keyboard: Component = () => {
  return (
    <div
      class='relative h-[1024px] kb:h-[768px]'
      style={{
        'font-family': 'Tourney',
        background:
          'radial-gradient(at 0% 100%, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))',
      }}
    >
      <h1 class='text-center text-white pt-[64px] px-2 right-0 left-0 text-6xl absolute pointer-events-none select-none'>
        Don't trust the user input
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas splineURL={splineURL} />
      </Suspense>
    </div>
  )
}
