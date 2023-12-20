'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Anchor, Button, createTheme } from '@mantine/core';
import classes from './theme.module.css';

export const theme = createTheme({
  primaryShade: 5,
  cursorType: 'pointer',
  components: {
    Button: Button.extend({
      classNames: {
        root: classes.button,
      },
    }),
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
