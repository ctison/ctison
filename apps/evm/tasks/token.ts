import { scope } from 'hardhat/config';

const tokenTask = scope('token', 'Token tasks');

tokenTask
  .task('debug', 'Print debug info about deployed contracts')
  .addPositionalParam('address', 'Address of the contract to debug')
  .setAction(async (args: { address: `0x{string}` }, hre) => {
    const token = await hre.viem.getContractAt('Token', args.address);
    console.log({
      name: await token.read.name(),
      symbol: await token.read.symbol(),
      decimals: await token.read.decimals(),
      balances: await token.read.balanceOf([
        `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
      ]),
      totalSupply: await token.read.totalSupply(),
      owner: await token.read.owner(),
    });
  });

tokenTask
  .task('deploy', 'Deploy Token proxy contract')
  .setAction(async (_, hre) => {
    const Token = await hre.ethers.getContractFactory('Token');
    const token = await hre.upgrades.deployProxy(Token, undefined, {
      kind: 'uups',
    });
    await token.waitForDeployment();

    console.log(`Token deployed to ${await token.getAddress()}`);
    // @ts-expect-error No need for third parameter: `runSuper`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await tokenTask.tasks.debug.action(
      { address: await token.getAddress() },
      hre,
    );
  });

tokenTask
  .task('upgrade', 'Upgrade the Token contract')
  .addPositionalParam(
    'address',
    'Address of the contract to upgrade',
    undefined,
  )
  .setAction(async (args: { address: string }, hre) => {
    const token = await hre.upgrades.upgradeProxy(
      args.address as `0x{string}`,
      await hre.ethers.getContractFactory('Token'),
      { kind: 'uups' },
    );
    console.log(`Token upgraded to ${await token.getAddress()}`);
  });
