import { Component, createEffect, createSignal, on, onCleanup } from 'solid-js'
import { Fit, Layout, Rive } from '@rive-app/canvas'
import { createElementSize } from '@solid-primitives/resize-observer'

export const MadeWith: Component = () => {
  const [canvas, setCanvasRef] = createSignal<HTMLCanvasElement>()
  const canvasSize = createElementSize(canvas)
  const [riveApp, setRiveApp] = createSignal<Rive>()

  createEffect(() => {
    const app = new Rive({
      src: '/orbits.riv',
      canvas: canvas(),
      autoplay: true,
      layout: new Layout({
        fit: Fit.FitHeight,
      }),
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
      { defer: true }
    )
  )

  return (
    <section class='h-[500px] bg-black'>
      <canvas ref={setCanvasRef} class='w-full h-full' />
    </section>
  )
}
