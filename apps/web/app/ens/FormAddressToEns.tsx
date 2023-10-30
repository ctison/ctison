'use client';

import { resolveAddressToEns } from '@/app/ens/actions';
import { SubmitButton } from '@/app/ui/SubmitButton';
import { TextInput } from '@mantine/core';
import { useFormState } from 'react-dom';

export default function FormAddressToEns() {
  const [state, formAction] = useFormState(resolveAddressToEns, null);

  return (
    <form action={formAction}>
      <h2>Reverse ENS resolver</h2>
      <TextInput
        label='Address to resolve'
        name='address'
        placeholder='0x000'
        required
      />
      <SubmitButton />
      <p aria-live='polite' className='sr-only'>
        {state?.error?._errors}
        {state?.address ?? 'No address'}
        {state?.ens?.map((ens) => <li key={ens}>{ens}</li>)}
      </p>
    </form>
  );
}
