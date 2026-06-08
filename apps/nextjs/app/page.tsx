// Landing page with a minimal placeholder hero.
export default function Home() {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24'>
      <h1 className='text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
        {"Hi, I'm Charles."}
      </h1>
      <p className='mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400'>
        Software engineer. This is my corner of the web — work in progress.
      </p>
    </main>
  );
}
