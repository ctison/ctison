import classes from './ButtonColorScheme.module.css';
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { LuSunMedium, LuMoon } from 'react-icons/lu';
import cx from 'clsx';

export interface ButtonColorSchemeProps {}

export const ButtonColorScheme: React.FC<ButtonColorSchemeProps> = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      variant='default'
      size='xl'
      aria-label='Toggle color scheme'
    >
      <LuSunMedium className={cx(classes.icon, classes.light)} stroke='1.5' />
      <LuMoon className={cx(classes.icon, classes.dark)} stroke='1.5' />
    </ActionIcon>
  );
};
