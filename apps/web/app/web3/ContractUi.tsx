import { CodeHighlight } from '@/_ui/CodeHighlight';
import { chainToChainId } from '@/_ui/WalletProvider';
import { Web3ConnectButton } from '@/_ui/Web3ConnectButton';
import { InlineCodeHighlight } from '@mantine/code-highlight';
import {
  Accordion,
  Alert,
  Button,
  Fieldset,
  Group,
  JsonInput,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDidUpdate } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Abi, isAddress } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

export const ContractUi: React.FC = () => {
  const form = useForm<{ chain: keyof typeof chainToApi; address: string }>({
    initialValues: {
      chain: 'Ethereum',
      address: '',
    },
    validate: {
      address: (value) => (isAddress(value) ? null : 'Invalid address'),
    },
  });
  const [abi, setAbi] = useState<Abi | undefined>(undefined);
  useEffect(() => {
    const storedValues = window.localStorage.getItem('ctison.contract');
    if (storedValues) {
      try {
        const { abi, ...values } = JSON.parse(
          storedValues,
        ) as typeof form.values & { abi: Abi };
        form.setValues(values);
        setAbi(abi);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useDidUpdate(() => {
    window.localStorage.setItem(
      'ctison.contract',
      JSON.stringify({ ...form.values, abi }),
    );
  }, [form.values, abi]);
  const fetchAbi = useMutation({
    mutationFn: () => chainToApi[form.values.chain](form.values.address),
    onMutate: () => setAbi(undefined),
    onSuccess: (data) => setAbi(data),
    onError: (error) => form.setFieldError('address', error.message),
  });

  return (
    <>
      <Title mb='md'>Contract UI</Title>
      <form
        onSubmit={form.onSubmit(() => {
          fetchAbi.mutate();
        })}
      >
        <Fieldset legend='Where is the contract?'>
          <Stack gap='sm'>
            <Select
              label='Chain'
              data={Object.keys(chainToApi)}
              allowDeselect={false}
              searchable
              nothingFoundMessage='No chain found...'
              checkIconPosition='right'
              disabled={fetchAbi.isPending}
              {...form.getInputProps('chain')}
            />
            <TextInput
              label='Contract address'
              placeholder='0x...'
              disabled={fetchAbi.isPending}
              {...form.getInputProps('address')}
            />
            <Group>
              <Button type='submit' loading={fetchAbi.isPending}>
                Load ABI from verified contract
              </Button>
            </Group>
          </Stack>
        </Fieldset>
      </form>
      {abi && (
        <Fieldset legend='JSON ABI' mt='md'>
          <JsonInput
            description='The ABI of the contract.'
            placeholder='Enter the JSON ABI or load it from a verified contract address.'
            value={JSON.stringify(abi, undefined, 2)}
            onChange={(value) => setAbi(JSON.parse(value))}
            disabled={fetchAbi.isPending}
            rows={15}
            contentEditable={false}
          />
        </Fieldset>
      )}
      {abi && (
        <Fieldset legend='Methods' mt='md'>
          <Accordion chevronPosition='left' multiple={true} variant='separated'>
            {abi?.map((method) => {
              if (method.type !== 'function') {
                return null;
              }
              return (
                <ContractFunction
                  chainId={chainToChainId[form.values.chain]}
                  abi={abi}
                  address={form.values.address}
                  key={method.name}
                  fn={method}
                />
              );
            })}
          </Accordion>
        </Fieldset>
      )}
    </>
  );
};

type AbiFunction<T = Abi[number]> = T extends Abi[number] & { type: 'function' }
  ? T
  : never;

interface ContractFunctionProps {
  chainId: number;
  abi: Abi;
  address: string;
  fn: AbiFunction;
}

export const ContractFunction: React.FC<ContractFunctionProps> = ({
  chainId,
  abi,
  address,
  fn,
}) => {
  const { isConnected, isConnecting } = useAccount();
  const form = useForm({
    initialValues: {
      inputs: fn.inputs.map(() => ''),
    },
  });
  const publicClient = usePublicClient({
    chainId,
  });
  const walletClient = useWalletClient({
    chainId,
  });
  const isReadFn =
    fn.stateMutability === 'pure' || fn.stateMutability === 'view';
  const interactContract = useMutation({
    mutationFn: async ({ inputs }: typeof form.values) => {
      console.log(address, fn.name, inputs);
      if (isReadFn) {
        const result = await publicClient.readContract({
          abi,
          address: address as `0x${string}`,
          functionName: fn.name,
          args: inputs.length > 0 ? inputs : undefined,
        });
        return `${result}`;
      } else {
        const result = await walletClient.data!.writeContract({
          abi,
          address: address as `0x${string}`,
          functionName: fn.name,
          args: inputs.length > 0 ? inputs : undefined,
        });
        return `${result}`;
      }
    },
  });
  return (
    <Accordion.Item key={fn.name} value={fn.name}>
      <Accordion.Control>
        <InlineCodeHighlight code={formatSoliditySignature(fn)} language='ts' />
      </Accordion.Control>
      <Accordion.Panel>
        <form
          onSubmit={form.onSubmit((values) => interactContract.mutate(values))}
        >
          <Stack>
            {fn.inputs.map((input, idx) => {
              return (
                <TextInput
                  key={idx}
                  label={`${input.name || '_'}: ${input.type}${
                    input.internalType ? ` (${input.internalType})` : ''
                  }`}
                  disabled={interactContract.isPending}
                  {...form.getInputProps(`inputs.${idx}`)}
                />
              );
            })}
            <Web3ConnectButton
              disableConnect={isReadFn}
              chainId={chainId}
              type='submit'
              miw='20%'
              style={{ alignSelf: 'baseline' }}
              loading={interactContract.isPending}
            >
              {isReadFn ? 'Read' : 'Write'}
            </Web3ConnectButton>
            {interactContract.error && (
              <Alert
                title={interactContract.error.name}
                color='red'
                variant='outline'
              >
                {interactContract.error.message}
              </Alert>
            )}
            {interactContract.data && (
              <CodeHighlight language='json' code={interactContract.data} />
            )}
          </Stack>
        </form>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

function formatSoliditySignature(
  fn: Abi[number] & { type: 'function' },
): string {
  return `function ${fn.name}(${fn.inputs
    .map((input) => `${input.type} ${input.name || '_'}`)
    .join(', ')})${
    fn.stateMutability !== 'nonpayable' ? ` ${fn.stateMutability}` : ''
  }${
    fn.outputs.length > 0
      ? ` returns (${fn.outputs.map((output) => output.type).join(', ')})`
      : ''
  }`;
}

const chainToApi: Record<
  keyof typeof chainToChainId,
  (address: string) => Promise<Abi>
> = {
  Ethereum: (address) => etherscanFetchAbi('Ethereum', address),
  Goerli: (address) => etherscanFetchAbi('Goerli', address),
  Sepolia: (address) => etherscanFetchAbi('Sepolia', address),
  'Arbitrum One': (address) => etherscanFetchAbi('Arbitrum One', address),
  Avalanche: (address) => etherscanFetchAbi('Avalanche', address),
  'BNB Smart Chain': (address) => etherscanFetchAbi('BNB Smart Chain', address),
  Polygon: (address) => etherscanFetchAbi('Polygon', address),
};

const etherscanEndpoints: Record<keyof typeof chainToApi, string> = {
  Ethereum: 'https://api.etherscan.io/api',
  Goerli: 'https://api-goerli.etherscan.io/api',
  Sepolia: 'https://api-sepolia.etherscan.io/api',
  'Arbitrum One': 'https://api.arbiscan.io/api',
  Avalanche:
    'https://api.avascan.info/v2/network/mainnet/evm/43114/etherscan/api',
  'BNB Smart Chain': 'https://api.bscscan.com/api',
  Polygon: 'https://api.polygonscan.com/api',
};

async function etherscanFetchAbi(
  chain: keyof typeof chainToApi,
  address: string,
) {
  const data = await fetch(
    `${etherscanEndpoints[chain]}` +
      '?module=contract&action=getabi' +
      `&address=${address}`,
  );
  const { result } = await data.json();
  const abi = JSON.parse(result) as Abi;
  return abi;
}
