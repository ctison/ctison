import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

export interface AptosWalletButtonProps {}

export const AptosWalletButton: React.FC<AptosWalletButtonProps> = () => {
  return (
    <>
      <WalletSelector />
    </>
  );
};
