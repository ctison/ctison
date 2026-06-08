import Link from 'next/link';

// Top-level navigation items for the site header.
const items = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

// Renders the primary site navigation as a row of links.
export function Nav() {
  return (
    <nav className='flex items-center gap-1 text-sm font-medium'>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='rounded-md px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
