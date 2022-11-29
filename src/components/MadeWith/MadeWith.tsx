import { Component, lazy } from 'solid-js'
import { A } from '~/components/A'

const Canvas = lazy(() => import('./Canvas'))

export const MadeWith: Component<{
  ip: string | undefined
}> = (props) => {
  return (
    <section class='h-[1000px] bg-white relative selection:(text-white bg-cyan-400)'>
      <h1 class='absolute left-2 right-2 top-60 text-center text-8xl font-semibold'>
        Built with{' '}
        <A href='https://www.solidjs.com' class='text-blue'>
          Solid.js
        </A>
      </h1>
      <div class='absolute left-0 right-0 items-center bottom-42 flex flex-col gap-1'>
        <span class='text-[1.5em] uppercase'>Your IP Address</span>
        <span class='text-[3em] font-semibold'>{props.ip}</span>
      </div>
      <Canvas />
      <span class='absolute left-0 right-0 bottom-12 text-center'>
        Animation made with{' '}
        <A class='text-gray' href='https://rive.app'>
          Rive
        </A>
      </span>
    </section>
  )
}
