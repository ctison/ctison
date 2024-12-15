import { Button, type ButtonProps } from '@mantine/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import React, { useCallback, useMemo } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

export interface Web3ButtonConnectProps
  extends ButtonProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonProps> {
  disableConnect?: boolean;
  chainId?: number;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

export const Web3ButtonConnect: React.FC<Readonly<Web3ButtonConnectProps>> = ({
  disableConnect,
  chainId,
  ref,
  ...props
}) => {
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
  const switchNetwork = useSwitchChain();
  const connectOnClick = useCallback(() => {
    if (!isConnected) {
      void openConnectModal();
    } else if (shouldSwitchChain && chainId !== undefined) {
      switchNetwork.switchChain({ chainId });
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
      loading={isConnecting || switchNetwork.isPending || loading}
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
};
