'use client';

import { IconChevronLeft, IconInfo } from '@/_ui/icons';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Alert,
  Button,
  Code,
  Fieldset,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { PiMathOperationsFill } from 'react-icons/pi';
import { VscGithub } from 'react-icons/vsc';
import { ExternalLink } from '@/_ui/ExternalLink';

export const ConvertUiIcon = FaCalculator;
export interface BaseConverterProps {}

export const BaseConverter: React.FC<BaseConverterProps> = () => {
  const { ...form } = useForm({
    initialValues: {
      number: '51966',
      inBase: '0123456789',
      toBase: '0123456789ABCDEF',
    },
    mode: 'uncontrolled',
  });

  const { mutate: convertBase, ...baseConversion } = useMutation({
    mutationFn: async ({ number, inBase, toBase }: typeof form.values) => {
      const baseConverter = await import('@ctison/base-converter');
      return baseConverter.baseToBase(number, inBase, toBase);
    },
  });

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        convertBase(values);
      }),
    [convertBase, form],
  );

  // cSpell:words Horner Ruffini
  return (
    <Stack gap='sm'>
      <Accordion
        variant='separated'
        chevron={<IconChevronLeft size='3em' />}
        classNames={{ chevron: 'data-rotate:!transform-[rotate(-90deg)]' }}
      >
        <AccordionItem value='info'>
          <AccordionControl icon={<IconInfo />} className='text-gray-400'>
            Convert "numbers" from any base to any base.
          </AccordionControl>
          <AccordionPanel classNames={{ content: '!text-sm' }}>
            <Stack gap='xs'>
              <p>
                Implementation of{' '}
                <ExternalLink href='https://www.wikiwand.com/en/articles/Horner%27s_method'>
                  Horner-Ruffini's method
                </ExternalLink>{' '}
                written in{' '}
                <ExternalLink href='https://github.com/ctison/base-converter'>
                  Rust and compiled to WebAssembly
                </ExternalLink>
                .
              </p>
              <p>First run may feel slower due to web assembly loading.</p>
              <p>
                Any UTF-8 can be used, eg. <Code>42</Code> in base{' '}
                <Code>0123456789</Code> (base 10 aka decimal) to base{' '}
                <Code>🦀🥰</Code> (base 2 aka binary) gives 🥰🦀🥰🦀🥰🦀 (or{' '}
                <Code>101010</Code> if output base is <Code>01</Code>).
              </p>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <form onSubmit={onSubmit}>
        <Fieldset
          legend={
            <Group gap='xs'>
              <ThemeIcon variant='subtle' color='black'>
                <PiMathOperationsFill size='70%' />
              </ThemeIcon>
              <Text fw='bold'>Base Converter</Text>
              <a
                href='https://github.com/ctison/base-converter'
                target='_blank'
                rel='noreferrer noopener'
              >
                <ActionIcon size='md' variant='subtle' color='black'>
                  <VscGithub size='70%' />
                </ActionIcon>
              </a>
            </Group>
          }
        >
          <Stack>
            <TextInput
              spellCheck={false}
              label='Number'
              {...form.getInputProps('number')}
            />
            <TextInput
              spellCheck={false}
              label='In Base'
              {...form.getInputProps('inBase')}
            />
            <TextInput
              spellCheck={false}
              label='To Base'
              {...form.getInputProps('toBase')}
            />
            <Button miw={200} className='self-start' type='submit'>
              Convert
            </Button>
            {baseConversion.isPending ? (
              <Loader />
            ) : baseConversion.isError ? (
              <Alert color='red' title={baseConversion.error.name}>
                {baseConversion.error.message}
              </Alert>
            ) : baseConversion.isSuccess ? (
              <CodeHighlight
                code={baseConversion.data}
                language='text'
                c='black'
                bg='green.0'
              />
            ) : null}
          </Stack>
        </Fieldset>
      </form>
    </Stack>
  );
};
