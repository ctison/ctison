import { Component, JSX, ParentComponent, Show, splitProps } from 'solid-js'

export const Footer: Component<{
  generatedAt: string | undefined
}> = (props) => {
  return (
    <footer class='h-48 py-4 bg-gradient-to-r from-teal-200 to-lime-200 selection:bg-fuchsia-400'>
      <div class='container h-full mx-auto flex flex-col items-center'>
        <div class='flex-grow' />
        <span>
          Source code on{' '}
          <Link href='https://github.com/ctison/ctison'>Github</Link>
        </span>
        <span>
          Built with <Link href='https://www.solidjs.com'>Solid.js</Link> on{' '}
          <Link href='https://www.netlify.com/'>Netlify</Link>
        </span>
        <Show when={props.generatedAt}>
          <span class='text-xs text-neutral-600 mt-2'>
            Generated at {props.generatedAt}
          </span>
        </Show>
      </div>
    </footer>
  )
}
const Link: ParentComponent<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <a
      target='_blank'
      class='font-semibold hover:underline focus:(outline-none ring)'
      rel='noreferrer'
      {...rest}
    >
      {local.children}
    </a>
  )
}
