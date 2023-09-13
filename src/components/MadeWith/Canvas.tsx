import { Component, createEffect, createSignal, on, onCleanup } from 'solid-js'
import { Fit, Layout, Rive } from '@rive-app/canvas'
import { createElementSize } from '@solid-primitives/resize-observer'

export const Canvas: Component = () => {
  const [canvas, setCanvasRef] = createSignal<HTMLCanvasElement>()
  const canvasSize = createElementSize(canvas)
  const [riveApp, setRiveApp] = createSignal<Rive>()

  createEffect(() => {
    const app = new Rive({
      src: '/orbits.riv',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      canvas: canvas()!,
      autoplay: true,
      layout: new Layout({
        fit: Fit.Cover,
      }),
      stateMachines: 'Main',
      onLoad: () => {
        app.resizeDrawingSurfaceToCanvas()
      },
    })
    onCleanup(() => {
      app.cleanup()
    })
    setRiveApp(app)
  })

  createEffect(
    on(
      [riveApp, () => canvasSize.width],
      ([app]) => {
        app?.resizeDrawingSurfaceToCanvas()
      },
      { defer: true },
    ),
  )
  return <canvas ref={setCanvasRef} class='w-full h-full' aria-hidden='true' />
}

export default Canvas
