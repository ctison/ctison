import { Component, JSX, mergeProps } from 'solid-js'

export interface TileProps {
  onClick: () => void
  style?: JSX.CSSProperties
}

export const Tile: Component<TileProps> = (props) => {
  const x = mergeProps({ style: {} }, props)
  return (
    <div
      class='tile hover:outline hover:outline-1 hover:hue-rotate-15'
      onClick={() => props.onClick()}
      style={x.style}
      aria-hidden='true'
    />
  )
}
