'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Anchor, createTheme, useMantineTheme } from '@mantine/core';

export const theme = createTheme({
  primaryShade: 6,
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'never',
      },
    }),
    CodeHighlight: CodeHighlight.extend({
      defaultProps: {
        copyLabel: 'Copy',
        pr: 'lg',
        styles: {
          code: {
            wordBreak: 'break-all',
            whiteSpace: 'initial',
          },
        },
      },
    }),
  },
});

export function usePrimaryColor() {
  const theme = useMantineTheme();
  return theme.colors[theme.primaryColor][theme.primaryShade as number];
}
