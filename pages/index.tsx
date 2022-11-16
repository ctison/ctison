import dynamic from 'next/dynamic'
import Head from 'next/head'
import { AppShell } from '~/components/AppShell'
import { Footer } from '~/components/AppShell/Footer'

const Keyboard = dynamic(() =>
  import('~/components/Keyboard').then((m) => m.Keyboard)
)

const StaggeredTiles = dynamic(() =>
  import('~/components/StaggeredTiles').then((m) => m.StaggeredTiles)
)

const Page = () => {
  return (
    <>
      <Head>
        <title>ctison</title>
      </Head>
      <AppShell>
        <Keyboard />
        <StaggeredTiles />
        <Footer />
      </AppShell>
    </>
  )
}

export default Page
