import { Alchemy, AlchemySettings, Network } from 'alchemy-sdk';
export { Network };

export type AlchemyMultichainSettings = Omit<AlchemySettings, 'network'>;

export class AlchemyMultichainClient {
  private readonly alchemies: Map<Network, Alchemy> = new Map();

  constructor(
    readonly overrides: Partial<
      Record<Network, AlchemyMultichainSettings>
    > = {},
    readonly settings: AlchemyMultichainSettings = {},
  ) {}

  getAlchemy(
    network: Network = Network.ETH_MAINNET,
    settings?: AlchemyMultichainSettings,
  ) {
    if (!this.alchemies.has(network)) {
      this.alchemies.set(
        network,
        new Alchemy({
          ...this.settings,
          ...this.overrides[network],
          ...settings,
          network,
        }),
      );
    }
    return this.alchemies.get(network)!;
  }
}
