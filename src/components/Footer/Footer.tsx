import { Component, Show } from 'solid-js'
import { A } from '~/components/A'

export const Footer: Component<{
  generatedAt: string | undefined
}> = (props) => {
  return (
    <footer class='h-[192px] py-4 bg-gradient-to-r from-teal-200 to-lime-200 selection:bg-fuchsia-400'>
      <div class='container h-full mx-auto flex flex-col items-center'>
        <div class='flex-grow' />
        <span>
          Source code on{' '}
          <A
            class='font-semibold hover:underline hover:outline-none'
            href='https://github.com/ctison/ctison'
          >
            Github
          </A>
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
