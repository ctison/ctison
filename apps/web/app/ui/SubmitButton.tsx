'use client';

import { Button, Group } from '@mantine/core';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Group justify='flex-end' mt='md'>
      <Button type='submit' loading={pending}>
        Submit
      </Button>
    </Group>
  );
}
