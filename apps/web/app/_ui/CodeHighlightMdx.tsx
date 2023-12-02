import {
  CodeHighlight as MantineCodeHighlight,
  CodeHighlightProps as MantineCodeHighlightProps,
} from '@mantine/code-highlight';
import { forwardRef } from 'react';

export const CodeHighlightMdx = forwardRef<
  HTMLDivElement,
  Omit<MantineCodeHighlightProps, 'code'>
>(function CodeHighlight({ children, ...props }, ref) {
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
      code={children as string}
    />
  );
});
