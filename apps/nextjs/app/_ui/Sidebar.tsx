'use client';

import {
  Folder01Icon,
  Home01Icon,
  Notebook01Icon,
  SidebarLeft01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Navigation entries rendered in the sidebar rail.
const items: { href: string; label: string; icon: IconSvgElement }[] = [
  { href: '/', label: 'Home', icon: Home01Icon },
  { href: '/blog', label: 'Blog', icon: Notebook01Icon },
  { href: '/projects', label: 'Projects', icon: Folder01Icon },
  { href: '/about', label: 'About', icon: UserIcon },
];

// A collapsible left sidebar: icons + labels when expanded, icon-only rail when collapsed.
export function Sidebar() {
  const pathname = usePathname();
  // Mirrors the DOM `data-sidebar` attribute, used only for `aria-expanded`.
  const [collapsed, setCollapsed] = useState(false);

  // On mount, sync local state with the attribute set by the anti-flash bootstrap script.
  useEffect(() => {
    setCollapsed(document.documentElement.dataset['sidebar'] === 'collapsed');
  }, []);

  // Flip the collapsed state on the document and persist the choice.
  function toggle() {
    const next = document.documentElement.dataset['sidebar'] !== 'collapsed';
    document.documentElement.dataset['sidebar'] = next ? 'collapsed' : 'expanded';
    localStorage.setItem('sidebar', next ? 'collapsed' : 'expanded');
    setCollapsed(next);
  }

  return (
    <aside className='collapsed:w-16 sticky top-16 flex h-[calc(100dvh-4rem)] w-56 flex-col border-r border-zinc-200 p-3 transition-[width] duration-200 dark:border-zinc-800'>
      <nav className='flex flex-col gap-1'>
        {items.map((item) => {
          // The Home link only matches the root; others match their prefix.
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-current={active ? 'page' : undefined}
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
                active
                  ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={20} className='shrink-0' />
              <span className='collapsed:hidden truncate'>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type='button'
        onClick={toggle}
        aria-label='Toggle sidebar'
        aria-expanded={!collapsed}
        className='mt-auto flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
      >
        <HugeiconsIcon
          icon={SidebarLeft01Icon}
          size={20}
          className='collapsed:rotate-180 shrink-0 transition-transform'
        />
        <span className='collapsed:hidden truncate'>Collapse</span>
      </button>
    </aside>
  );
}
