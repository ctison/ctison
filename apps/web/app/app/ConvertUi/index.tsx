'use client';

import { CodeHighlight } from '@/_ui/CodeHighlight';
import {
  Alert,
  Button,
  Fieldset,
  Group,
  Loader,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { PiMathOperationsFill } from 'react-icons/pi';

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
            <PiMathOperationsFill />
            Base Converter
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
