import '@mantine/code-highlight/styles.css';
import {
  CodeHighlight as MantineCodeHighlight,
  CodeHighlightProps as MantineCodeHighlightProps,
} from '@mantine/code-highlight';
import { forwardRef } from 'react';

export const CodeHighlight = forwardRef<
  HTMLDivElement,
  MantineCodeHighlightProps
>(function CodeHighlight(props, ref) {
  return (
    <MantineCodeHighlight
      ref={ref}
      copyLabel='Copy'
      pr='lg'
      styles={{
        code: {
          wordBreak: 'break-all',
          whiteSpace: 'initial',
        },
      }}
      {...props}
    />
  );
});
