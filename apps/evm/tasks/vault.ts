import { scope } from 'hardhat/config';

const vaultScope = scope('vault', 'Vault tasks');

vaultScope
  .task('debug', 'Print debug info about deployed contracts')
  .addPositionalParam('address', 'Address of the contract to debug')
  .setAction(async (args: { address: `0x{string}` }, hre) => {
    const vault = await hre.viem.getContractAt('Vault', args.address);
    const [owner] = await hre.ethers.getSigners();
    const forAddress = owner.address as `0x{string}`;
    console.log({
      name: await vault.read.name(),
      symbol: await vault.read.symbol(),
      decimals: await vault.read.decimals(),
      asset: await vault.read.asset(),
      balanceOf: await vault.read.balanceOf([forAddress]),
      maxDeposit: await vault.read.maxDeposit([forAddress]),
      maxMint: await vault.read.maxMint([forAddress]),
      maxRedeem: await vault.read.maxRedeem([forAddress]),
      maxWithdraw: await vault.read.maxWithdraw([forAddress]),
      owner: await vault.read.owner(),
      totalAssets: await vault.read.totalAssets(),
      totalSupply: await vault.read.totalSupply(),
    });
  });

vaultScope
  .task('deploy', 'Deploy Vault contract')
  .addPositionalParam('address', 'Address of the staked ERC20')
  .setAction(async (args: { address: `0x{string}` }, hre) => {
    const Vault = await hre.ethers.getContractFactory('Vault');
    const vault = await hre.upgrades.deployProxy(Vault, [args.address], {
      kind: 'uups',
    });
    await vault.waitForDeployment();

    console.log(`Vault deployed to ${await vault.getAddress()}`);
    // @ts-expect-error No need for third parameter: `runSuper`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await vaultScope.tasks.debug.action(
      { address: await vault.getAddress() },
      hre,
    );
  });
