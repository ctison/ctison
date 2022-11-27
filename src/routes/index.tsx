import { Meta, refetchRouteData, Title, useRouteData } from 'solid-start'
import { createServerData$ } from 'solid-start/server'
import { Keyboard } from '~/components/Keyboard'
import { MadeWith } from '~/components/MadeWith'
import { StaggeredTiles } from '~/components/StaggeredTiles'

export function routeData() {
  return createServerData$(
    async (_, event) => {
      return event.request.headers.get('x-nf-client-connection-ip') ?? 'X.X.X.X'
    },
    {
      initialValue: 'X.X.X.X',
      ssrLoadFrom: 'initial',
      onHydrated: () => {
        refetchRouteData()
      },
    }
  )
}

export default function () {
  const data = useRouteData<typeof routeData>()

  return (
    <>
      <Title>@ctison</Title>
      <Meta name='description' content="ctison's website" />
      <Keyboard />
      <StaggeredTiles />
      <MadeWith ip={data()} />
    </>
  )
}
