import { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
  const stream = request.nextUrl.searchParams.get('stream') === 'true';
  if (stream) {
    const iterator = generate();
    const stream = new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      },
    });
    return new Response(stream);
  }
  console.log('OK');
  return Response.json({
    method: request.method,
    url: request.url,
    nextUrl: request.nextUrl,
    cookies: request.cookies,
    headers: Object.fromEntries(request.headers.entries()),
  });
}

const encoder = new TextEncoder();

async function* generate() {
  for (let i = 0; i < 10; i++) {
    yield encoder.encode(`Message ${i}`);
    await new Promise((r) => setTimeout(r, 1000));
  }
}
