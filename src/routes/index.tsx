import { Title } from 'solid-start'
import { Keyboard } from '~/components/Keyboard'
import { MadeWith } from '~/components/MadeWith'
import { StaggeredTiles } from '~/components/StaggeredTiles'

export default function () {
  return (
    <>
      <Title>@ctison</Title>
      <Keyboard />
      <StaggeredTiles />
      <MadeWith />
    </>
  )
}
