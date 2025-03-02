import { apps } from '@/app';
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
  ...apps.map((app) => ({
    href: `/app/${app.slug}`,
    label: app.label,
    Icon: app.icon,
  })),
];
