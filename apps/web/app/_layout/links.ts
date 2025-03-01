import { tabs } from '@/app/[[...slug]]/tabs';
import { type Route } from 'next';
import { type IconType } from 'react-icons';
import { IoHome } from 'react-icons/io5';

export const links: {
  href: Route;
  label: string;
  Icon: IconType;
  startsWith?: boolean;
}[] = [
  { href: '/', label: 'Home', Icon: IoHome },
  ...tabs.map((tab) => ({
    href: `/app/${tab.slug}`,
    label: tab.label,
    Icon: tab.icon,
  })),
];
