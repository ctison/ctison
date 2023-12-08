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

export const SafeInfosForm: React.FC<{
  createTab: (tab: Partial<Tab>) => void;
}> = ({ createTab }) => {
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      chain:
        'Ethereum' satisfies keyof typeof safeSupportedChains as keyof typeof safeSupportedChains,
      safeAddress: '' as `0x${string}`,
    },
    validate: {
      safeAddress: (value) => (isAddress(value) ? null : 'Invalid address'),
    },
  });

  const onSubmit = useMemo(
    () =>
      formOnSubmit((values) => {
        createTab({
          type: 'safe-infos',
          safeAddress: values.safeAddress,
          chain: values.chain,
        });
      }),
    [createTab, formOnSubmit],
  );

  return (
    <Stack>
      <form onSubmit={onSubmit}>
        <Fieldset legend='Get Safe Infos'>
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
            setAddress={(address) =>
              form.setFieldValue('safeAddress', address as `0x${string}`)
            }
            label='Safe Address'
            placeholder='0x...'
            {...form.getInputProps('safeAddress')}
          />
          <Button type='submit' mt='md'>
            Get infos
          </Button>
        </Fieldset>
      </form>
    </Stack>
  );
};

export const SafeInfos: React.FC<{
  chain: keyof typeof safeSupportedChains;
  safeAddress: `0x${string}`;
  id: string;
}> = ({ chain, safeAddress, id }) => {
  const safeApiKit = useSafeApiKit(chain);
  const safeInfos = useQuery({
    queryKey: ['safe-infos', chain, safeAddress],
    queryFn: () => safeApiKit.getSafeInfo(safeAddress),
  });
  const safeDelegates = useQuery({
    queryKey: ['safe-delegates', chain, safeAddress],
    queryFn: () => safeApiKit.getSafeDelegates({ safeAddress: safeAddress }),
  });
  const safeCreationInfos = useQuery({
    queryKey: ['safe-creation-infos', chain, safeAddress],
    queryFn: () => safeApiKit.getSafeCreationInfo(safeAddress),
  });
  const incomingTransactions = useQuery({
    queryKey: ['incoming-transactions', chain, safeAddress],
    queryFn: () => safeApiKit.getIncomingTransactions(safeAddress),
  });
  const moduleTransactions = useQuery({
    queryKey: ['module-transactions', chain, safeAddress],
    queryFn: () => safeApiKit.getModuleTransactions(safeAddress),
  });
  const multisigTransactions = useQuery({
    queryKey: ['multisig-transactions', chain, safeAddress],
    queryFn: () => safeApiKit.getMultisigTransactions(safeAddress),
  });
  const pendingTransactions = useQuery({
    queryKey: ['pending-transactions', chain, safeAddress],
    queryFn: () => safeApiKit.getPendingTransactions(safeAddress),
  });
  const nextNonce = useQuery({
    queryKey: ['next-nonce', chain, safeAddress],
    queryFn: () => safeApiKit.getNextNonce(safeAddress),
  });

  return (
    <Stack mt='md' gap='xs'>
      <Text fw='bold'>Safe Address on {chain}</Text>
      <CodeHighlight language='json' code={safeAddress} />
      <Accordion
        defaultValue={['Safe Infos']}
        chevronPosition='left'
        variant='separated'
        multiple={true}
      >
        <Result id={id} title='Safe Infos' query={safeInfos} />
        <Result id={id} title='Safe Delegates' query={safeDelegates} />
        <Result id={id} title='Safe Creation Infos' query={safeCreationInfos} />
        <Result id={id} title='Next Nonce' query={nextNonce} />
        <Result
          id={id}
          title='Incoming Transactions'
          query={incomingTransactions}
        />
        <Result
          id={id}
          title='Module Transactions'
          query={moduleTransactions}
        />
        <Result
          id={id}
          title='Multisig Transactions'
          query={multisigTransactions}
        />
        <Result
          id={id}
          title='Pending Transactions'
          query={pendingTransactions}
        />
      </Accordion>
    </Stack>
  );
};
