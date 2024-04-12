import { Route } from 'next';
import { IconType } from 'react-icons';
import { HiLightningBolt } from 'react-icons/hi';
import { IoHome } from 'react-icons/io5';

export const links: {
  href: Route;
  label: string;
  Icon: IconType;
  startsWith?: boolean;
}[] = [
  { href: '/', label: 'Home', Icon: IoHome },
  {
    href: '/app' as Route,
    label: 'Tools',
    Icon: HiLightningBolt,
    startsWith: true,
  },
  {
    href: '/aptos',
    label: 'Aptos',
    Icon: HiLightningBolt,
    startsWith: true,
  },
];
