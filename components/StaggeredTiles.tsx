'use client'

import { Box, Title } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { Passero_One } from '@next/font/google'
import { gsap } from 'gsap'
import { useMemo, useRef } from 'react'

const titleFont = Passero_One({ weight: '400', subsets: ['latin'] })

const colors = ['#94d82d', '#5c7cfa', '#fcc419', '#cc5de8']

export const StaggeredTiles: React.FC = () => {
  const colorIndex = useRef(0)
  const { ref, width, height } = useElementSize()
  const { cols, rows } = useMemo(
    () => ({
      cols: Math.floor(width / 32),
      rows: Math.floor(height / 32),
    }),
    [width, height]
  )
  const total = useMemo(() => cols * rows, [cols, rows])
  const tiles = useMemo(
    () =>
      Array.from({ length: total }).map((_, i) => (
        <Tile
          key={i}
          onClick={() => {
            colorIndex.current = (colorIndex.current + 1) % colors.length
            gsap.to('.tile', {
              backgroundColor: colors[colorIndex.current],
              stagger: {
                each: 0.015,
                grid: [rows, cols],
                from: i,
              },
            })
          }}
        />
      )),
    [total, cols, rows]
  )
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: 264,
        backgroundColor: 'black',
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      <Title
        color='white'
        sx={{
          position: 'absolute',
          width: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textAlign: 'center',
          pointerEvents: 'none',
          fontSize: '4rem',
          fontWeight: 'normal',
          ...titleFont.style,
        }}
      >
        Cool effect
      </Title>
      {tiles}
    </Box>
  )
}

interface TileProps {
  onClick: () => void
}

const Tile: React.FC<TileProps> = (props) => {
  return (
    <Box
      className={'tile'}
      sx={{
        backgroundColor: colors[0],
        '&:hover': {
          outline: 'black solid 1px',
          filter: 'hue-rotate(15deg)',
        },
      }}
      onClick={() => {
        props.onClick()
      }}
    />
  )
}
