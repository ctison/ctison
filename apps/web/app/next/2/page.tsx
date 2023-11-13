import { use } from 'react';

export default function Page() {
  use(new Promise((resolve) => setTimeout(resolve, 1000)));
  throw new Error('Page 2 intentional throw');
}
