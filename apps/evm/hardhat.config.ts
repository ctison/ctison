import '@next/env';
import '@nomicfoundation/hardhat-foundry';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomicfoundation/hardhat-ledger';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.23',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL ?? '',
      accounts: [process.env.ETH_PRIVATE_KEY ?? ''],
      ledgerAccounts: [process.env.LEDGER_ACCOUNT ?? ''],
    },
  },
};
export default config;
