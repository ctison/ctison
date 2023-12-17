import { Button, ButtonProps } from '@mantine/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { forwardRef, useCallback, useMemo } from 'react';
import { useAccount, useChainId, useSwitchNetwork } from 'wagmi';

export interface Web3ButtonConnectProps
  extends ButtonProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonProps> {
  disableConnect?: boolean;
  chainId?: number;
}

export const Web3ButtonConnect = forwardRef<
  HTMLButtonElement,
  Web3ButtonConnectProps
>(function Web3ConnectButton({ disableConnect, chainId, ...props }, ref) {
  const { isConnected, isConnecting } = useAccount();
  const currentChain = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const shouldSwitchChain = useMemo(
    () => chainId !== undefined && chainId !== currentChain,
    [chainId, currentChain],
  );
  const shouldOverrideProps = useMemo(
    () => !isConnected || shouldSwitchChain,
    [isConnected, shouldSwitchChain],
  );
  const switchNetwork = useSwitchNetwork();
  const connectOnClick = useCallback(() => {
    if (!isConnected) {
      openConnectModal();
    } else if (shouldSwitchChain) {
      switchNetwork.switchNetwork!(chainId);
    }
  }, [
    openConnectModal,
    isConnected,
    shouldSwitchChain,
    switchNetwork,
    chainId,
  ]);

  if (disableConnect) {
    return <Button ref={ref} {...props} />;
  }

  const { loading, color, disabled, onClick, type, ...others } = props;
  return (
    <Button
      ref={ref}
      loading={isConnecting || switchNetwork.isLoading || loading}
      color={shouldOverrideProps ? 'black' : color}
      type={shouldOverrideProps ? 'button' : type}
      disabled={shouldOverrideProps ? false : disabled}
      onClick={shouldOverrideProps ? connectOnClick : onClick}
      {...others}
    >
      {!isConnected
        ? 'Connect Wallet'
        : shouldSwitchChain
          ? 'Switch network'
          : props.children}
    </Button>
  );
});
