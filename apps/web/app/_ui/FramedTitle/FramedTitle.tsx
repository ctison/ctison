import {
  Box,
  BoxProps,
  Title,
  TitleProps,
  createPolymorphicComponent,
} from '@mantine/core';
import classes from './FramedTitle.module.css';
import { forwardRef } from 'react';

export interface FramedTitleProps extends TitleProps {
  boxProps?: BoxProps;
}

export const FramedTitle = createPolymorphicComponent<'h1', FramedTitleProps>(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLHeadingElement, FramedTitleProps>(
    ({ boxProps, ...props }, ref) => (
      <Box className={classes['box']} {...boxProps}>
        <Title {...props} ref={ref} />
      </Box>
    ),
  ),
);

FramedTitle.displayName = 'FramedTitle';
