'use client';

import classes from './BaseConverter.module.css';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  ActionIcon,
  Alert,
  Button,
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

export const ConvertUiIcon = FaCalculator;
export interface BaseConverterProps {}

export const BaseConverter: React.FC<BaseConverterProps> = () => {
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      number: '51966',
      inBase: '0123456789',
      toBase: '0123456789ABCDEF',
    },
  });

  const { mutate: convertBase, ...baseConversion } = useMutation({
    mutationFn: async ({ number, inBase, toBase }: typeof form.values) => {
      const baseConverter = await import('@ctison/base-converter');
      return baseConverter.baseToBase(number, inBase, toBase);
    },
  });

  const onSubmit = useMemo(
    () =>
      formOnSubmit((values) => {
        convertBase(values);
      }),
    [convertBase, formOnSubmit],
  );

  return (
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
          <Button miw={200} className={classes['submit-button']} type='submit'>
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
  );
};
