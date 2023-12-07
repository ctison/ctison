import { Route } from 'next';
import { IconType } from 'react-icons';
import { BiWorld } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { TiRss } from 'react-icons/ti';

export const links: {
  href: Route;
  label: string;
  Icon: IconType;
  startsWith?: boolean;
}[] = [
  { href: '/', label: 'Home', Icon: IoHome },
  { href: '/web3' as Route, label: 'Web3', Icon: FaEthereum },
  { href: '/blog', label: 'Blog', Icon: TiRss, startsWith: true },
  { href: '/links', label: 'Links', Icon: FaLink },
  { href: '/data/france', label: 'Data', Icon: BiWorld, startsWith: true },
];
