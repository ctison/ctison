'use server';

import { default as Moralis } from 'moralis';

const started = false;

export async function getWalletTokenBalances(chain: number, address: string) {
  if (!started) {
    await Moralis.start({
      apiKey: process.env['MORALIS_API_KEY'],
    });
  }

  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain,
    address,
  });

  console.log(response.toJSON());

  return response.result;
}
