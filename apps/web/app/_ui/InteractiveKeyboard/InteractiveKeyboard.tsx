'use client';

import { Box, LoadingOverlay } from '@mantine/core';
import Spline from '@splinetool/react-spline';
import { useCallback, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';

export interface InteractiveKeyboardProps {}

export const InteractiveKeyboard: React.FC<InteractiveKeyboardProps> = () => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <>
      <Box
        w='100%'
        h={{ xs: 600, sm: 'calc(100dvh - var(--app-shell-header-height))' }}
        pos='relative'
        bg='radial-gradient(at 0% 100%, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))'
      >
        <AnimatedCursor />
        <LoadingOverlay visible={!loaded} zIndex={1000} />
        <Spline
          scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode'
          onLoad={onLoad}
        />
      </Box>
    </>
  );
};
