import { Meta, Title } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { Keyboard } from '~/components/Keyboard'
import { MadeWith } from '~/components/MadeWith'
import { StaggeredTiles } from '~/components/StaggeredTiles'

export function routeData() {
  return createServerData$(async (_, event) => {
    console.log(JSON.stringify(event, null, 2))
    console.log(event.request.headers)
    return ''
  })
}

export default function () {
  return (
    <>
      <Title>@ctison</Title>
      <Meta name='description' content="ctison's website" />
      <Keyboard />
      <StaggeredTiles />
      <MadeWith />
    </>
  )
}
