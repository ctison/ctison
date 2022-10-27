import {
  Button,
  Container,
  Divider,
  Footer as MantineFooter,
  SimpleGrid,
  Text,
} from '@mantine/core'
import { SiElement, SiGithub } from 'react-icons/si'

export const Footer: React.FC = () => {
  return (
    <MantineFooter height={200} zIndex={-2000} py='xl' fixed>
      <Container>
        <SimpleGrid cols={2}>
          <Button
            leftIcon={<SiElement size={20} />}
            component='a'
            href='https://matrix.to/#/@ctison:matrix.org'
            target='_blank'
            rel='noreferrer'
            radius='xl'
            styles={() => ({
              root: {
                backgroundColor: '#1AB378',
                '&:hover': {
                  backgroundColor: '#158A5D',
                },
              },
            })}
          >
            Contact me on Element
          </Button>
          <Button
            leftIcon={<SiGithub size={20} />}
            component='a'
            href='https://github.com/ctison'
            target='_blank'
            rel='noreferrer'
            radius='xl'
            styles={() => ({
              root: {
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'lightgrey',
                },
              },
            })}
          >
            Github
          </Button>
        </SimpleGrid>
        <Divider my='sm' />
        <Text color='dimmed' align='center'>
          Built with{' '}
          <a href='https://nextjs.org' rel='noreferrer'>
            Next.JS
          </a>
        </Text>
      </Container>
    </MantineFooter>
  )
}
