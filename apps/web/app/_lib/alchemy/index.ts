'use server';

import { AlchemyMultichainClient, Network } from './AlchemyMultichainClient';

export const alchemies = new AlchemyMultichainClient({
  [Network.ETH_MAINNET]: { apiKey: process.env.ALCHEMY_API_KEY_ETH_MAINNET! },
  [Network.ETH_SEPOLIA]: { apiKey: process.env.ALCHEMY_API_KEY_ETH_SEPOLIA! },
  [Network.ETH_GOERLI]: { apiKey: process.env.ALCHEMY_API_KEY_ETH_GOERLI! },
  [Network.ARB_MAINNET]: { apiKey: process.env.ALCHEMY_API_KEY_ARB_MAINNET! },
  [Network.MATIC_MAINNET]: {
    apiKey: process.env.ALCHEMY_API_KEY_MATIC_MAINNET,
  },
});

export async function getBalances(networkId: number, address: string) {
  const alchemy = alchemies.getAlchemy(networkIdToNetwork[networkId]);
  const balances = await alchemy.core.getTokenBalances(address);
  return balances;
}

export const networkIdToNetwork: Record<number, Network> = {
  1: Network.ETH_MAINNET,
  10: Network.OPT_MAINNET,
};
