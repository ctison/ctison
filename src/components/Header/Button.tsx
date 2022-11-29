import type { ParentComponent } from 'solid-js'
import { A } from 'solid-start'

type AProps = Parameters<typeof A>[0]

export interface ButtonProps extends AProps {}

export const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <A
      target='_blank'
      rel='noreferrer'
      class='cursor-pointer border border-neutral-200 rounded-lg w-8 h-8 flex justify-center items-center hover:bg-neutral-200'
      {...props}
    >
      {props.children}
    </A>
  )
}
