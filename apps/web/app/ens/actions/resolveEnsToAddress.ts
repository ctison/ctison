'use server';

import { alchemy } from '@/app/_lib/alchemy';
import { z } from 'zod';

const EnsToAddressRequestSchema = z.object({
  ens: z.string().min(3),
});

export type EnsToAddressRequest = z.infer<typeof EnsToAddressRequestSchema>;

export async function resolveEnsToAddress(_state: unknown, formData: FormData) {
  const validation = EnsToAddressRequestSchema.safeParse({
    ens: formData.get('ens'),
  });
  if (!validation.success) {
    console.log(validation.error.flatten());
    console.log(validation.error.format());
    console.log(validation.error.toString());
    return {
      error: validation.error.format(),
    };
  }

  const address = await alchemy.core.resolveName(validation.data.ens);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    ens: validation.data.ens,
    address: address,
  };
}
