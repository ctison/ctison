'use client'

import { Box, keyframes, Title, Transition } from '@mantine/core'
import { useElementSize, usePrevious } from '@mantine/hooks'
import Spline from '@splinetool/react-spline'
import { type Application } from '@splinetool/runtime'
import { useEffect, useRef } from 'react'
import { Tourney } from '@next/font/google'

const breakpoint = 800
const titleFont = Tourney({ subsets: ['latin'] })

const titleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-540deg) scale(0);
    transform-origin: 0 50%;
  }
  100% {
    opacity: 1;
    transform: rotate(0) scale(1);
    transform-origin: 0 50%;
  }
`

function computeZoom(
  spline: Application,
  width: number,
  previousWidth: number | undefined
) {
  if (width <= 0) {
    return
  } else if (!previousWidth) {
    if (width <= breakpoint) {
      spline.setZoom(0.5)
    }
  } else if (previousWidth > breakpoint && width <= 800) {
    spline.setZoom(0.5)
  } else if (previousWidth <= breakpoint && width > breakpoint) {
    spline.setZoom(2)
  }
}

export const Keyboard: React.FC = () => {
  const spline = useRef<Application>()
  const { ref, width } = useElementSize()
  const previousWidth = usePrevious(width)
  useEffect(() => {
    if (!spline.current) {
      return
    }
    computeZoom(spline.current, width, previousWidth)
  }, [width, previousWidth])

  return (
    <Box
      ref={ref}
      sx={{
        height: width <= breakpoint ? 768 : 1024,
        background:
          'black radial-gradient(rgba(255,255,255,0.2) 8%, transparent 8%)',
        backgroundPosition: '0% 0%',
        backgroundSize: '5vmin 5vmin',
        '& canvas': {
          width: '100% !important',
          height: '100% !important',
        },
        position: 'relative',
      }}
    >
      <Transition mounted={true} transition='pop' duration={400}>
        {(styles) => (
          <Title
            style={{ ...titleFont.style, ...styles }}
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              paddingTop: 64,
              pointerEvents: 'none',
              userSelect: 'none',
              animation: `${titleAnimation} 2s ease-in`,
            }}
            ta='center'
            size='3.5rem'
          >
            {"Don't trust the user input"}
          </Title>
        )}
      </Transition>
      <Spline
        scene='https://prod.spline.design/0LZWfTLCGR7s8LpX/scene.splinecode'
        onLoad={(app) => {
          spline.current = app
          computeZoom(app, app.canvas.getBoundingClientRect().width, undefined)
        }}
      />
    </Box>
  )
}
