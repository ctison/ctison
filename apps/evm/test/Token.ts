import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('Token', function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory('Token');
    const token = await hre.upgrades.deployProxy(Token, undefined, {
      kind: 'uups',
    });
    await token.waitForDeployment();

    const publicClient = await hre.viem.getPublicClient();

    return {
      Token,
      token,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe('Deployment', function () {
    it('Should upgrade successfully', async function () {
      const { Token, token } = await loadFixture(deployTokenFixture);

      await hre.upgrades.upgradeProxy(token, Token, { kind: 'uups' });
    });

    it('Should not be upgradable by others', async () => {
      const { Token, token, otherAccount } =
        await loadFixture(deployTokenFixture);

      await expect(
        hre.upgrades.upgradeProxy(token, Token.connect(otherAccount), {
          kind: 'uups',
        }),
      ).to.rejectedWith('OwnableUnauthorizedAccount');
    });

    it('Should set the right owner', async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);

      expect(await token.owner()).to.be.equal(owner.address);
    });
  });
});
