import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>ctison.dev</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
