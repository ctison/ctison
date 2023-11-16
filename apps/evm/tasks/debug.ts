import { task } from 'hardhat/config';

interface TaskArguments {
  address: string;
}

task('debug', 'Print debug info about deployed contracts')
  .addPositionalParam('address', 'Address of the contract to debug')
  .setAction(async (args: TaskArguments, hre) => {
    const token = await hre.viem.getContractAt(
      'Token',
      args.address as `0x{string}`,
    );
    console.log({
      name: await token.read.name(),
      symbol: await token.read.symbol(),
      decimals: await token.read.decimals(),
      balance: await token.read.balanceOf([
        `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
      ]),
      totalSupply: await token.read.totalSupply(),
      owner: await token.read.owner(),
    });
  });
