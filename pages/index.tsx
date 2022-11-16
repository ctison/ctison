import Head from 'next/head'
import { AppShell } from '~/components/AppShell'
import { Footer } from '~/components/AppShell/Footer'
import { Keyboard } from '~/components/Keyboard'
import { StaggeredTiles } from '~/components/StaggeredTiles'

const Page = () => {
  return (
    <>
      <Head>ctison</Head>
      <AppShell>
        <Keyboard />
        <StaggeredTiles />
        <Footer />
      </AppShell>
    </>
  )
}

export default Page
