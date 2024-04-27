import { FavoriteStack } from '@/_ui/FavoriteStack';
import { FavoriteTools } from '@/_ui/FavoriteTools';
import { InteractiveKeyboard } from './_ui/InteractiveKeyboard';

export default function Home() {
  return (
    <>
      <InteractiveKeyboard />
      <FavoriteTools />
      <FavoriteStack />
    </>
  );
}
