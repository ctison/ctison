import { HttpStatusCode } from 'solid-start/server'

export default function NotFound() {
  return (
    <div class='h-[calc(100vh-60px-192px)] flex justify-center items-center'>
      <HttpStatusCode code={404} />
      <h1 class=' font-bold text-8xl'>404</h1>
    </div>
  )
}
