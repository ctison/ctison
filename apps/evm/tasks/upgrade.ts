import { task } from 'hardhat/config';

interface TaskArguments {
  address: `0x{string}`;
}

task('upgrade', 'Upgrade the Token contract')
  .addPositionalParam(
    'address',
    'Address of the contract to upgrade',
    undefined,
  )
  .setAction(async (args: TaskArguments, hre) => {
    const token = await hre.upgrades.upgradeProxy(
      args.address as `0x{string}`,
      await hre.ethers.getContractFactory('Token'),
    );
    console.log(`Token upgraded to ${await token.getAddress()}`);
  });
