'use client';

import { Anchor, createTheme, useMantineTheme } from '@mantine/core';

export const theme = createTheme({
  primaryShade: 6,
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'never',
      },
    }),
  },
});

export function usePrimaryColor() {
  const theme = useMantineTheme();
  return theme.colors[theme.primaryColor][theme.primaryShade as number];
}
