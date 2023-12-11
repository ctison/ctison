'use client';

import { CodeHighlight } from '@/_ui/CodeHighlight';
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

export const ConvertUi: React.FC = () => {
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      number: '51966',
      inBase: '0123456789',
      toBase: '0123456789ABCDEF',
    },
  });

  const convertBase = useMutation({
    mutationFn: async ({ number, inBase, toBase }: typeof form.values) => {
      const baseConverter = await import('@ctison/base-converter');
      return baseConverter.baseToBase(number, inBase, toBase);
    },
  });

  const onSubmit = useMemo(
    () =>
      formOnSubmit(async (values) => {
        convertBase.mutate(values);
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
            <a href='https://github.com/ctison/base-converter' target='_blank'>
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
          <Button miw={200} style={{ alignSelf: 'flex-start' }} type='submit'>
            Convert
          </Button>
          {convertBase.isPending ? (
            <Loader />
          ) : convertBase.isError ? (
            <Alert color='red' title={convertBase.error.name}>
              {convertBase.error.message}
            </Alert>
          ) : convertBase.isSuccess ? (
            <CodeHighlight
              code={convertBase.data}
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
