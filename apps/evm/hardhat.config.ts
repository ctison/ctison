import '@next/env';
import '@nomicfoundation/hardhat-foundry';
import '@nomicfoundation/hardhat-ledger';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@openzeppelin/hardhat-upgrades';
import { HardhatUserConfig, task } from 'hardhat/config';

import './tasks/debug';
import './tasks/upgrade';

const SEPOLIA_URL = 'https://ethereum-sepolia.publicnode.com';
const ETH_PRIVATE_KEY =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

const config: HardhatUserConfig = {
  solidity: '0.8.23',
  defaultNetwork: 'localhost',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL ?? SEPOLIA_URL,
      accounts: [process.env.ETH_PRIVATE_KEY ?? ETH_PRIVATE_KEY],
      ledgerAccounts: [process.env.LEDGER_ACCOUNT ?? ''],
    },
  },
};
export default config;

task('version', 'Prints ethers version', async (_, hre) => {
  console.log('Ethers', hre.ethers.version);
});
