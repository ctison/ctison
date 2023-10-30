import FormAddressToEns from '@/app/ens/FormAddressToEns';
import FormEnsToAddress from '@/app/ens/FormEnsToAddress';
import { SubmitButton } from '@/app/ui/SubmitButton';
import { TextInput } from '@mantine/core';
import {} from 'alchemy-sdk';
import { NextPage } from 'next';
import { useFormState } from 'react-dom';
import { z } from 'zod';

const EnsSchema = z.object({
  ens: z.string(),
});

export const Ens: NextPage = () => {
  return (
    <>
      <FormEnsToAddress />
      <FormAddressToEns />
    </>
  );
};

export default Ens;
