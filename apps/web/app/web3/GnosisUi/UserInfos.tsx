import { CodeHighlight } from '@/_ui/CodeHighlight';
import { InputAddress } from '@/_ui/InputAddress';
import {
  Accordion,
  Button,
  Fieldset,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { isAddress } from 'viem';
import { Tab, safeSupportedChains, useSafeApiKit } from '.';
import { Result } from './Result';

export const UserInfosForm: React.FC<{
  createTab: (tab: Partial<Tab>) => void;
}> = ({ createTab }) => {
  const form = useForm({
    initialValues: {
      chain:
        'Ethereum' satisfies keyof typeof safeSupportedChains as keyof typeof safeSupportedChains,
      userAddress: '' as `0x${string}`,
    },
    validate: {
      userAddress: (value) => (isAddress(value) ? null : 'Invalid address'),
    },
  });

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        createTab({
          type: 'user-infos',
          userAddress: values.userAddress,
          chain: values.chain,
        });
      }),
    [createTab, form],
  );

  return (
    <Stack>
      <form onSubmit={onSubmit}>
        <Fieldset legend='Get User Infos'>
          <Select
            label='Chain'
            data={Object.keys(safeSupportedChains)}
            allowDeselect={false}
            searchable
            nothingFoundMessage='No chain found...'
            checkIconPosition='right'
            {...form.getInputProps('chain')}
          />
          <InputAddress
            label='User Address'
            placeholder='0x...'
            setAddress={(address) =>
              form.setFieldValue('userAddress', address as `0x${string}`)
            }
            {...form.getInputProps('userAddress')}
          />
          <Button type='submit' mt='md'>
            Get infos
          </Button>
        </Fieldset>
      </form>
    </Stack>
  );
};

export const UserInfos: React.FC<{
  chain: keyof typeof safeSupportedChains;
  userAddress: `0x${string}`;
  id: string;
}> = ({ chain, userAddress, id }) => {
  const safeApiKit = useSafeApiKit(chain);
  const safes = useQuery({
    queryKey: ['safes', chain, userAddress],
    queryFn: () => safeApiKit.getSafesByOwner(userAddress),
  });
  const safeDelegate = useQuery({
    queryKey: ['safe-delegate', chain, userAddress],
    queryFn: () =>
      safeApiKit.getSafeDelegates({
        delegateAddress: userAddress,
        delegatorAddress: userAddress,
      }),
  });
  return (
    <Stack mt='md' gap='xs'>
      <Button
        onClick={async () => {
          console.log(await safeApiKit.getServiceInfo());
          console.log(await safeApiKit.getServiceSingletonsInfo());
          console.log(await safeApiKit.getTokenList());
        }}
      >
        Click
      </Button>
      <Text fw='bold'>User Address on {chain}</Text>
      <CodeHighlight language='json' code={userAddress} />
      <Accordion
        defaultValue={['Safes']}
        chevronPosition='left'
        variant='separated'
        multiple={true}
      >
        <Result id={id} title='Safes' query={safes} />
        <Result id={id} title='Safes Delegates' query={safeDelegate} />
      </Accordion>
    </Stack>
  );
};
