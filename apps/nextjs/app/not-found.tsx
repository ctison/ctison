import Link from 'next/link';

// Styled 404 page shown for unmatched routes and `notFound()` calls.
export default function NotFound() {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24'>
      <p className='font-mono text-sm font-medium text-zinc-500'>404</p>
      <h1 className='mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
        Page not found.
      </h1>
      <p className='mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400'>
        {"The page you're looking for doesn't exist or has moved."}
      </p>
      <Link
        href='/'
        className='mt-8 w-fit font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50'
      >
        Go home
      </Link>
    </main>
  );
}
