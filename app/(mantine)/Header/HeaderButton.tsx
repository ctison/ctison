'use client'

import { UnstyledButton } from '@mantine/core'

export interface HeaderButtonProps extends React.PropsWithChildren {
  href?: string
  onClick?: () => void
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  href,
  onClick,
}) => {
  return (
    <UnstyledButton
      component='a'
      href={href}
      target='_blank'
      onClick={onClick}
      rel='noreferrer'
      sx={{
        border: '1px solid #dee2e6',
        borderRadius: 8,
        width: 34,
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#f8f9fa',
        },
      }}
    >
      {children}
    </UnstyledButton>
  )
}
