import { ActionIcon, TextInput, Tooltip } from '@mantine/core';
import React, { useCallback } from 'react';
import { BiWallet } from 'react-icons/bi';
import { useAccount } from 'wagmi';

export type Web3InputAddressProps = React.ComponentPropsWithRef<
  typeof TextInput
> & {
  setAddress: (address: string) => void;
};

export const Web3InputAddress: React.FC<Web3InputAddressProps> = ({
  setAddress,
  ...props
}: Web3InputAddressProps) => {
  const { address } = useAccount();
  const fillAddressFromWallet = useCallback(() => {
    setAddress(address as string);
  }, [setAddress, address]);

  return (
    <TextInput
      label='Address'
      placeholder='Type an address here.'
      rightSection={
        <Tooltip label='Use current wallet address'>
          <ActionIcon
            variant='subtle'
            aria-label='Use current wallet address'
            onClick={fillAddressFromWallet}
            disabled={!address}
          >
            <BiWallet />
          </ActionIcon>
        </Tooltip>
      }
      spellCheck={false}
      {...props}
    />
  );
};
