'use server';

import { alchemy } from '@/app/_lib/alchemy';
import { z } from 'zod';

const AddressToEnsRequestSchema = z.object({
  address: z.string().startsWith('0x').length(42),
});

export async function resolveAddressToEns(_state: unknown, formData: FormData) {
  const validation = AddressToEnsRequestSchema.safeParse({
    address: formData.get('address'),
  });
  if (!validation.success) {
    console.log(validation.error.flatten());
    console.log(validation.error.format());
    console.log(validation.error.toString());
    return {
      error: validation.error.format(),
    };
  }

  const ensContractAddress = '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401';

  const ensNfts = await alchemy.nft.getNftsForOwner(validation.data.address, {
    contractAddresses: [ensContractAddress],
  });

  console.log(ensNfts);

  return {
    address: validation.data.address,
    ens: ensNfts.ownedNfts.map((nft) => nft.title),
  };
}
