import { feed } from './feed';

export async function GET() {
  return new Response(feed.rss2(), {
    headers: {
      'content-type': 'application/rss+xml',
    },
  });
}
