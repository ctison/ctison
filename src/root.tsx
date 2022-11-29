// @refresh reload

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
} from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const emojiSvg = (emoji: string) => {
  return (
    'data:image/svg+xml,' +
    `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`
  )
}

export default function Root() {
  const data = createServerData$(() => ({
    generatedAt: new Date().toISOString(),
  }))

  return (
    <Html lang='en'>
      <Head>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
        <Link rel='icon' href={emojiSvg('🚀')} />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Header />
            <main>
              <Routes>
                <FileRoutes />
              </Routes>
            </main>
            <Footer generatedAt={data()?.generatedAt} />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
