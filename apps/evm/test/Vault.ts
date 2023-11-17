import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('Vault', function () {
  async function deployVaultFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Token = await hre.ethers.getContractFactory('Token');
    const token = await hre.upgrades.deployProxy(Token, undefined, {
      kind: 'uups',
    });

    const Vault = await hre.ethers.getContractFactory('Vault');
    const vault = await hre.upgrades.deployProxy(
      Vault,
      [await token.getAddress()],
      { kind: 'uups' },
    );
    await vault.waitForDeployment();

    const publicClient = await hre.viem.getPublicClient();

    return {
      Token,
      token,
      Vault,
      vault,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe('Deployment', function () {
    it('Should upgrade successfully', async function () {
      const { Vault, vault } = await loadFixture(deployVaultFixture);

      await hre.upgrades.upgradeProxy(vault, Vault, { kind: 'uups' });
    });

    it('Should not be upgradable by others', async () => {
      const { Vault, vault, otherAccount } =
        await loadFixture(deployVaultFixture);

      await expect(
        hre.upgrades.upgradeProxy(vault, Vault.connect(otherAccount), {
          kind: 'uups',
        }),
      ).to.rejectedWith('OwnableUnauthorizedAccount');
    });

    it('Should set the right owner', async function () {
      const { vault, owner } = await loadFixture(deployVaultFixture);

      expect(await vault.owner()).to.be.equal(owner.address);
    });
  });

  describe('Deposit & Withdraw', () => {
    it('Should deposit & widthdraw successfully', async () => {
      const { token, vault, owner } = await loadFixture(deployVaultFixture);

      const initialTokens = (await token.balanceOf(owner.address)) as bigint;
      const initialStakedTokens = (await vault.balanceOf(
        owner.address,
      )) as bigint;

      expect(
        await vault.totalAssets(),
        'Vault total assets before',
      ).to.be.equal(0);

      await token.approve(await vault.getAddress(), 100);
      await vault.deposit(100, owner.address);

      expect(await vault.totalAssets(), 'Vault total assets').to.be.equal(100);
      expect(await token.balanceOf(owner.address), 'Token balance').to.be.equal(
        initialTokens - BigInt(100),
      );
      expect(await vault.balanceOf(owner.address), 'Vault shares').to.be.equal(
        initialStakedTokens + BigInt(100),
      );

      await expect(
        vault.redeem(100, owner.address, owner.address),
        'Redeem',
      ).to.changeTokenBalances(
        token,
        [owner, await vault.getAddress()],
        [100, -100],
      );

      expect(await vault.totalAssets(), 'Vault total assets after').to.be.equal(
        0,
      );
      expect(await token.balanceOf(owner.address), 'Token balance').to.be.equal(
        initialTokens,
      );
      expect(await vault.balanceOf(owner.address), 'Vault shares').to.be.equal(
        initialStakedTokens,
      );
    });
  });
});
