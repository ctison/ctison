import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core';
import NextImage from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import { TiRss } from 'react-icons/ti';
import { VscGithub } from 'react-icons/vsc';
import { Link } from '../Link';
import classes from './Hero.module.css';
import { list } from './data';
import image from './image.png';

export interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <Container py='xl'>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Box>
          <Title className={classes['title']}>
            👋 Welcome to my digital{' '}
            <span className={classes['highlight']}>playground</span>!
          </Title>
          <Text c='dimmed' mt='md'>
            {`I'm @ctison, a software developer with a heart full of code
            and a mind buzzing with innovative ideas. My journey in tech began
            with a curious click and evolved into a relentless pursuit of
            programming perfection.`}
          </Text>

          <List
            mt={30}
            spacing='sm'
            size='sm'
            icon={
              <ThemeIcon size={20} radius='xl' color='teal.2'>
                <FaCheck
                  style={{ width: rem(10), height: rem(10) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            {list.map((item) => (
              <ListItem key={item.title}>
                <b>{item.title}</b> - {item.body}
              </ListItem>
            ))}
          </List>
        </Box>
        <Flex h='100%' direction='column' justify='center' align='center'>
          <Image
            src={image.src}
            alt='Hero Image'
            component={NextImage}
            width={260}
            height={465}
          />
          <SimpleGrid mt={30} cols={2}>
            <Button
              component={Link}
              href='/blog'
              radius='xl'
              size='md'
              variant='light'
              color='orange'
              leftSection={<TiRss />}
              className={classes['button-orange']}
            >
              Blog
            </Button>
            <Button
              component='a'
              href='https://github.com/ctison'
              target='_blank'
              variant='default'
              radius='xl'
              size='md'
              leftSection={<VscGithub />}
            >
              Github
            </Button>
          </SimpleGrid>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};
