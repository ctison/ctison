'use client';

import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';
import hanzisJson from './hanzi.json';
import { For } from 'million/react';

export default function Page({
  params: { chars },
}: {
  params: { chars?: string[] };
}) {
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      chars: chars?.[0],
    },
  });

  const [hanzis, setHanzis] = useState<(typeof hanzisJson)[string][]>([]);

  const onSubmit = useMemo(
    () =>
      formOnSubmit((values) => {
        setHanzis([]);
        if (values.chars === undefined) return;
        for (const char of values.chars) {
          const hanzi = hanzisJson[char];
          if (hanzi !== undefined) {
            setHanzis((hanzis) => [...hanzis, hanzi]);
          }
        }
      }),
    [formOnSubmit],
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextInput {...form.getInputProps('chars')} />
        <Button type='submit'>Submit</Button>
      </form>
      <For each={hanzis}>{(item) => <li>{item.pinyin}</li>}</For>
    </>
  );
}
