'use client';

import { resolveEnsToAddress } from '@/app/ens/actions';
import { SubmitButton } from '@/app/ui/SubmitButton';
import { TextInput } from '@mantine/core';
import { useFormState } from 'react-dom';

export default function FormEnsToAddress() {
  const [state, formAction] = useFormState(resolveEnsToAddress, null);

  return (
    <form action={formAction}>
      <h2>Resolve an ENS name</h2>
      <TextInput
        label='ENS name to resolve'
        name='ens'
        placeholder='vitalik.eth'
        required
      />
      <SubmitButton />
      <p aria-live='polite' className='sr-only'>
        {state?.error?._errors}
        {state?.ens}
        {state?.address ?? 'No address'}
      </p>
    </form>
  );
}
