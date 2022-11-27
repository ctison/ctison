import { Component, JSX, lazy, ParentComponent, splitProps } from 'solid-js'

const Canvas = lazy(() => import('./Canvas'))

export const MadeWith: Component<{
  ip: string | undefined
}> = (props) => {
  return (
    <section class='h-[1000px] bg-white relative selection:(text-white bg-cyan-400)'>
      <h1 class='absolute left-0 right-0 top-42 text-center text-5xl font-semibold'>
        Built with <Link href='https://www.solidjs.com'>Solid.js</Link>
        {' on '}
        <Link href='https://www.netlify.com/'>Netlify</Link>
      </h1>
      <div class='absolute left-0 right-0 items-center bottom-42 flex flex-col gap-1'>
        <span class='text-[1.5em] uppercase'>Your IP Address</span>
        <span class='text-[3em] font-semibold'>{props.ip}</span>
      </div>
      <Canvas />
    </section>
  )
}

const Link: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <a
      target='_blank'
      class='text-sky-600 hover:underline focus:(outline-none ring)'
      rel='noreferrer'
      {...rest}
    >
      {local.children}
    </a>
  )
}
