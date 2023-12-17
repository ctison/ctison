import {
  ActionIcon,
  TextInput,
  TextInputProps,
  Tooltip,
  createPolymorphicComponent,
} from '@mantine/core';
import { forwardRef, useCallback } from 'react';
import { BiWallet } from 'react-icons/bi';
import { useAccount } from 'wagmi';

export interface Web3InputAddressProps extends TextInputProps {
  setAddress: (address: string) => void;
}

export const Web3InputAddress = createPolymorphicComponent<
  'input',
  Web3InputAddressProps
>(
  forwardRef<HTMLInputElement, Web3InputAddressProps>(function Web3InputAddress(
    { setAddress, ...others },
    ref,
  ) {
    const { address } = useAccount();
    const fillAddressFromWallet = useCallback(() => {
      setAddress(address as string);
    }, [setAddress, address]);

    return (
      <TextInput
        ref={ref}
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
        {...others}
      />
    );
  }),
);
