import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Disable static rendering at build time by using cookies
  void cookies();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error('Page 2 intentional throw');
}
