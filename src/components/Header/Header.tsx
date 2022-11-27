import { A } from 'solid-start'
import {
  SiGithub,
  SiDevdotto,
  SiElement,
  SiTwitter,
  SiLinkedin,
} from 'solid-icons/si'
import { Button } from './Button'
import type { Component } from 'solid-js'

export const Header: Component = () => {
  return (
    <header class='h-[60px] bg-bg-light-400 flex justify-between items-center p-4'>
      <A
        href='/'
        class='font-medium text-lg text-pink-600 no-underline focus:(outline-none ring)'
        aria-label='Website Home'
      >
        @ctison
      </A>
      <nav class='flex gap-2.5'>
        <Button
          href='https://github.com/ctison'
          aria-label="ctison's Github profile"
        >
          <SiGithub size={20} aria-label='Github Icon' role='img' />
        </Button>
        <Button
          href='https://dev.to/ctison'
          aria-label="ctison's Dev.to profile"
        >
          <SiDevdotto size={20} aria-label='Dev.to Icon' role='img' />
        </Button>
        <Button
          href='https://twitter.com/ctison_'
          aria-label="ctison's Twitter profile"
        >
          <SiTwitter size={20} aria-label='Twitter Icon' role='img' />
        </Button>
        <Button
          href='https://www.linkedin.com/in/charles-tison/'
          aria-label="ctison's Linkedin profile"
        >
          <SiLinkedin size={20} aria-label='Linkedin Icon' role='img' />
        </Button>
        <Button
          href='https://matrix.to/#/@ctison:matrix.org'
          aria-label="ctison's Matrix/Element contact"
        >
          <SiElement size={20} aria-label='Element Icon' role='img' />
        </Button>
      </nav>
    </header>
  )
}
