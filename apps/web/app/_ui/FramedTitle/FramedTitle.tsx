import { Box, type BoxProps, Title, type TitleProps } from '@mantine/core';
import classes from './FramedTitle.module.css';

export interface FramedTitleProps extends TitleProps {
  boxProps?: BoxProps;
  ref?: (typeof Title)['ref'];
}

export const FramedTitle: React.FC<Readonly<FramedTitleProps>> = ({
  boxProps,
  ref,
  ...props
}) => (
  <Box className={classes['box']} {...boxProps}>
    <Title {...props} ref={ref} />
  </Box>
);
