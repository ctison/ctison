import { Component, createEffect, createSignal } from 'solid-js'
import { Application } from '@splinetool/runtime'
import { createElementSize } from '@solid-primitives/resize-observer'

const breakpoint = 800

export interface CanvasProps {
  splineURL: string
}

export const Canvas: Component<CanvasProps> = (props) => {
  const [canvas, setCanvasRef] = createSignal<HTMLCanvasElement>()
  const canvasSize = createElementSize(canvas)
  const [previousCanvasWidth, setPreviousCanvasWidth] = createSignal<number>()

  createEffect(
    (previousWidth?: number) => {
      setPreviousCanvasWidth(previousWidth)
      return canvasSize.width ?? undefined
    },
    undefined,
    { name: 'Compute previous canvas width' }
  )

  createEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const spline = new Application(canvas()!)
    spline.load(props.splineURL).then(() => {
      createEffect(() => {
        const width = canvasSize.width ?? -1
        const prevWidth = previousCanvasWidth()

        if (width <= 0) {
          return
        } else if (!prevWidth) {
          if (width < breakpoint) {
            spline.setZoom(0.5)
          }
        } else if (prevWidth > breakpoint && width <= breakpoint) {
          spline.setZoom(0.5)
        } else if (prevWidth <= breakpoint && width > breakpoint) {
          spline.setZoom(2)
        }
      })
    })
  })

  return <canvas ref={setCanvasRef} aria-label='3D Interactive Keyboard' />
}

export default Canvas
