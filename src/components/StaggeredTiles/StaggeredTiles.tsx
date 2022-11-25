import '@fontsource/passero-one'
import { IndexRange } from '@solid-primitives/range'
import { createElementSize } from '@solid-primitives/resize-observer'
import { gsap } from 'gsap'
import { Component, createMemo, createSignal } from 'solid-js'

import { Tile } from './Tile'

const colors = ['#94d82d', '#5c7cfa', '#fcc419', '#cc5de8']

export const StaggeredTiles: Component = () => {
  let colorIndex = 0
  const [ref, setRef] = createSignal<HTMLDivElement>()
  const size = createElementSize(ref)

  const grid = createMemo(() => ({
    columns: Math.floor((size.width ?? 0) / 50),
    rows: Math.floor((size.height ?? 0) / 50),
  }))

  const total = createMemo(() => grid().columns * grid().rows)

  return (
    <div
      ref={setRef}
      class='h-64 relative grid'
      style={{
        'grid-template-rows': `repeat(${grid().rows}, 1fr)`,
        'grid-template-columns': `repeat(${grid().columns}, 1fr)`,
      }}
      aria-hidden='true'
    >
      <h1
        class='white absolute w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 text-center pointer-events-none text-6xl select-none'
        style={{ 'font-family': '"Passero One", cursive' }}
      >
        Cool Effect
      </h1>
      <IndexRange start={0} to={total()}>
        {(i) => (
          <Tile
            style={{
              'background-color': colors[colorIndex],
            }}
            onClick={() => {
              colorIndex = (colorIndex + 1) % colors.length
              gsap.to('.tile', {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                backgroundColor: colors[colorIndex]!,
                stagger: {
                  each: 0.025,
                  grid: [grid().rows, grid().columns],
                  from: i(),
                },
              })
            }}
          />
        )}
      </IndexRange>
    </div>
  )
}
