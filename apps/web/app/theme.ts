'use client';

import { createTheme, Anchor } from '@mantine/core';

export const theme = createTheme({
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'never',
      },
    }),
  },
});
