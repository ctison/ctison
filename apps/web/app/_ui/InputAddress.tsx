import {
  ActionIcon,
  TextInput,
  TextInputProps,
  Tooltip,
  createPolymorphicComponent,
} from '@mantine/core';
import { useAddress } from '@thirdweb-dev/react';
import { forwardRef, useCallback } from 'react';
import { BiWallet } from 'react-icons/bi';

export type InputAddressProps = TextInputProps & {
  setAddress: (address: string) => void;
};

export const InputAddress = createPolymorphicComponent<
  'input',
  InputAddressProps
>(
  forwardRef<HTMLInputElement, InputAddressProps>(function InputAddress(
    { setAddress, ...others },
    ref,
  ) {
    const address = useAddress();
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
        {...others}
      />
    );
  }),
);
