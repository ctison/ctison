import Link from 'next/link';
import { Nav } from './Nav';
import { ThemeToggle } from './ThemeToggle';

// The site header: brand on the left, navigation and theme toggle on the right.
export function Header() {
  return (
    <header className='bg-background/80 sticky top-0 z-50 border-b border-zinc-200 backdrop-blur dark:border-zinc-800'>
      <div className='mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6'>
        <Link href='/' className='font-mono text-base font-semibold tracking-tight'>
          @ctison.dev
        </Link>
        <div className='flex items-center gap-2'>
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
