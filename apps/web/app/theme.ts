'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Anchor, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryShade: 5,
  cursorType: 'pointer',
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
