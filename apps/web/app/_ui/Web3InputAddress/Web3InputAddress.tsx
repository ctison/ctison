import { ActionIcon, TextInput, Tooltip } from '@mantine/core';
import React, { useCallback } from 'react';
import { BiWallet } from 'react-icons/bi';
import { useAccount } from 'wagmi';

export type Web3InputAddressProps<Element extends React.ElementType> =
  PolymorphicComponentProps<Element> & {
    setAddress: (address: string) => void;
  };

export const Web3InputAddress = <
  Element extends React.ElementType = typeof TextInput,
>({
  as,
  setAddress,
  ...props
}: Web3InputAddressProps<Element>) => {
  const { address } = useAccount();
  const fillAddressFromWallet = useCallback(() => {
    setAddress(address as string);
  }, [setAddress, address]);

  const Element: React.ElementType = as || TextInput;

  return (
    <Element
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
