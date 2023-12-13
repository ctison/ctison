import { InputAddress } from '@/_ui/InputAddress';
import {
  Accordion,
  Button,
  Fieldset,
  Group,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { GnosisSafe2 } from 'react-web3-icons';
import { isAddress } from 'viem';
import { Tab, safeSupportedChains } from '.';
import { Result } from './Result';
import { useSafeApiKit } from './useSafeApiKit';
import { CodeHighlight } from '@mantine/code-highlight';

export const SafeIcon = GnosisSafe2;

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
          title: `${values.chain} ${values.safeAddress}`,
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
        <Fieldset
          legend={
            <Group>
              <SafeIcon /> Get Safe Infos
            </Group>
          }
        >
          <Select
            label='Chain'
            data={Object.keys(safeSupportedChains)}
            allowDeselect={false}
            searchable
            nothingFoundMessage='No chain found...'
            checkIconPosition='right'
            spellCheck={false}
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
      <Group justify='center'>
        <SafeIcon />
        <Text fw='bold'>{chain}</Text>
        <CodeHighlight language='json' code={safeAddress} />
      </Group>
      <Accordion
        defaultValue={['Safe Infos']}
        chevronPosition='left'
        variant='contained'
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
