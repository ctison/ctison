import hre from 'hardhat';

async function main() {
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await hre.upgrades.deployProxy(Token);
  await token.waitForDeployment();

  console.log(`Token deployed to ${await token.getAddress()}`);
  // @ts-expect-error No need for third parameter: `runSuper`
  await hre.tasks.debug.action({ address: await token.getAddress() }, hre);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
