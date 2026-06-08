'use client';

import { Toggle } from '@base-ui/react/toggle';
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useState } from 'react';

// A button that switches the site between light and dark themes.
export function ThemeToggle() {
  // Tracks whether dark mode is active; starts undefined until mounted to avoid hydration mismatch.
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  // On mount, read the theme already applied to <html> by the anti-FOUC script.
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Apply a new theme to the document and persist the choice.
  function apply(next: boolean) {
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  const isDark = dark ?? false;

  return (
    <Toggle
      aria-label='Toggle dark mode'
      pressed={isDark}
      onPressedChange={apply}
      className='inline-flex size-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
    >
      <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} size={20} />
    </Toggle>
  );
}
