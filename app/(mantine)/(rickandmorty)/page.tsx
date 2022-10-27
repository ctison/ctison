'use client'

import { Box } from '@mantine/core'
import { useMouse } from '@mantine/hooks'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import eyeImage from './eye.png'
import rickAndMortyImage from './rick-and-morty.png'

const angle = (cx: number, cy: number, ex: number, ey: number) => {
  const dy = ey - cy
  const dx = ex - cx
  const rad = Math.atan2(dy, dx)
  const deg = (rad * 180) / Math.PI
  return deg
}

const Home: NextPage = () => {
  const { x: mouseX, y: mouseY } = useMouse()
  const [rickAndMorty, setRickAndMorty] = useState<HTMLImageElement>()
  const [angleDeg, setAngleDeg] = useState(0)
  useEffect(() => {
    if (!rickAndMorty) return
    const rekt = rickAndMorty.getBoundingClientRect()
    const anchorX = rekt.left + rekt.width / 2
    const anchorY = rekt.top + rekt.height / 2
    setAngleDeg(angle(mouseX, mouseY, anchorX, anchorY))
  }, [rickAndMorty, mouseX, mouseY])
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <Image
          src={rickAndMortyImage}
          alt='Rick and Morty'
          onLoadingComplete={setRickAndMorty}
          style={{
            filter: `hue-rotate(${angleDeg}deg)`,
            objectFit: 'contain',
          }}
          priority
        />
        <Image
          src={eyeImage}
          alt="Rick's Left Eye"
          style={{
            top: '32.5%',
            right: '27%',
            rotate: `${180 + angleDeg}deg`,
            position: 'absolute',
          }}
        />
        <Image
          src={eyeImage}
          alt="Rick's Right Eye"
          style={{
            top: '32.5%',
            right: '38%',
            rotate: `${180 + angleDeg}deg`,
            position: 'absolute',

            filter: `hue-rotate(${angleDeg}deg)`,
          }}
        />
        <Image
          src={eyeImage}
          alt="Morty's Left Eye"
          style={{
            top: '62%',
            left: '43%',
            rotate: `${180 + angleDeg}deg`,
            position: 'absolute',

            filter: `hue-rotate(${angleDeg}deg)`,
          }}
        />
        <Image
          src={eyeImage}
          alt="Morty's Right Eye"
          style={{
            top: '64.2%',
            left: '32%',
            rotate: `${180 + angleDeg}deg`,
            position: 'absolute',

            filter: `hue-rotate(${angleDeg}deg)`,
          }}
        />
      </Box>
    </Box>
  )
}

export default Home
