import { json } from 'solid-start'
import { type ApiHandler } from 'solid-start/api/types'

const handler: ApiHandler = async (event) => {
  const headers: Record<string, string> = {}
  event.request.headers.forEach((value, key) => {
    headers[key] = value
  })
  const body =
    event.request.headers.get('content-type') === 'application/json'
      ? await event.request.json()
      : await event.request.text()
  return json({
    method: event.request.method,
    url: event.request.url,
    headers,
    body,
  })
}

export const GET = handler
export const POST = handler
export const PATCH = handler
export const PUT = handler
export const DELETE = handler
