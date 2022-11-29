import { combineProps } from '@solid-primitives/props'
import { Component, ComponentProps, splitProps } from 'solid-js'

export const A: Component<ComponentProps<'a'>> = (props) => {
  const [local, rest] = splitProps(props, ['children'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const combined = combineProps(rest as any, {
    class: 'rounded hover:outline outline-2 outline-offset-2',
    target: '_blank',
    rel: 'noreferrer',
  })
  return <a {...combined}>{local.children}</a>
}
