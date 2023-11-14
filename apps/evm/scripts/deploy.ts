import hre from 'hardhat';

async function main() {
  const lock = await hre.viem.deployContract('Token', [], {});

  console.log(`Token deployed to ${lock.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
