import { getLinks } from '@/_lib/airtable';
import { Main } from './Main';

export const revalidate = 3600;

export const metadata = {
  title: 'Links',
};

export default async function Page() {
  const links = await getLinks();
  return <Main links={links} />;
}
