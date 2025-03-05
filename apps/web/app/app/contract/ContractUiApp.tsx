'use client';

import { Web3ButtonConnect } from '@/_ui/Web3ButtonConnect';
import abiSchema from '@/public/abi.schema.json';
import { CodeHighlight, InlineCodeHighlight } from '@mantine/code-highlight';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Alert,
  Button,
  Container,
  Fieldset,
  Group,
  Modal,
  OptionalPortal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  useDidUpdate,
  useDisclosure,
  useLocalStorage,
  useMediaQuery,
} from '@mantine/hooks';
import { Editor, type EditorProps } from '@monaco-editor/react';
import { useMutation } from '@tanstack/react-query';
import { Abi as AbiParser } from 'abitype/zod';
import { useEffect, useMemo, useState } from 'react';
import { CgMaximizeAlt } from 'react-icons/cg';
import { isAddress, parseUnits } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { z } from 'zod';
import { chains } from './chains';
import { examples } from './examples';
import { IconChevronLeft, IconInfo } from '@/_ui/icons';

type Abi = z.infer<typeof AbiParser>;

export const ContractUiApp: React.FC<Readonly<{ id: string }>> = ({ id }) => {
  const form = useForm<{ chain: string; address: string }>({
    initialValues: {
      chain: chains.keys().next().value!,
      address: '',
    },
    validate: {
      address: (value) => (isAddress(value) ? null : 'Invalid address'),
    },
  });
  const [abiStr, setAbiStr] = useLocalStorage<string | undefined>({
    key: `ctison.contract.abi-${id}`,
  });
  const abi = useMemo<
    | {
        data?: Abi;
        error?: Error;
      }
    | undefined
  >(() => {
    try {
      if (!abiStr) {
        return undefined;
      }
      return { data: AbiParser.parse(JSON.parse(abiStr)) };
    } catch (error) {
      return { error: error as Error };
    }
  }, [abiStr]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedValues = window.localStorage.getItem(`ctison.contract-${id}`);
    try {
      if (storedValues) {
        form.setValues(JSON.parse(storedValues) as typeof form.values);
      }
    } catch {
      // Ignore error
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useDidUpdate(() => {
    window.localStorage.setItem(
      `ctison.contract-${id}`,
      JSON.stringify({ ...form.values }),
    );
  }, [form.values, abi]);
  const fetchAbi = useMutation({
    mutationFn: () =>
      etherscanFetchAbi(
        chains.get(form.values.chain)!,
        process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
        form.values.address,
      ),
    onMutate: () => {
      setAbiStr(undefined);
    },
    onSuccess: (data) => {
      setAbiStr(JSON.stringify(data, undefined, 2));
    },
    onError: (error) => {
      form.setFieldError('address', error.message);
    },
  });
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <>
      <Container size='xl'>
        <Accordion
          variant='separated'
          mt='xl'
          chevron={<IconChevronLeft size='3em' />}
          classNames={{ chevron: 'data-rotate:!transform-[rotate(-90deg)]' }}
        >
          <AccordionItem value='info'>
            <AccordionControl icon={<IconInfo />} className='!font-mono'>
              Interact with smart contracts
            </AccordionControl>
            <AccordionPanel>
              <Text>
                This is a simple contract interaction UI. You can load an ABI
                from a verified contract on Etherscan or paste it as JSON. You
                can then interact with the smart contract.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <SimpleGrid cols={{ base: 1, md: 2 }} mt='md'>
          <Fieldset legend='Where is the contract?'>
            <form
              onSubmit={form.onSubmit(() => {
                fetchAbi.mutate();
              })}
            >
              <Stack gap='sm'>
                <Select
                  label='Load an example contract'
                  data={[...examples.keys()]}
                  allowDeselect={false}
                  searchable
                  nothingFoundMessage='No example found...'
                  checkIconPosition='right'
                  disabled={loading || fetchAbi.isPending}
                  spellCheck={false}
                  onChange={(value) => {
                    if (!value) {
                      return;
                    }
                    const { chain, address } = examples.get(value)!;
                    form.setValues({ chain, address });
                  }}
                />
                <Select
                  label='Chain'
                  data={[...chains.keys()]}
                  allowDeselect={false}
                  searchable
                  nothingFoundMessage='No chain found...'
                  checkIconPosition='right'
                  disabled={loading || fetchAbi.isPending}
                  spellCheck={false}
                  {...form.getInputProps('chain')}
                />
                <TextInput
                  label='Contract address'
                  placeholder='0x...'
                  disabled={loading || fetchAbi.isPending}
                  spellCheck={false}
                  {...form.getInputProps('address')}
                />
                <Group mt='md'>
                  <Button
                    type='submit'
                    loading={loading || fetchAbi.isPending}
                    loaderProps={{
                      type: 'dots',
                    }}
                  >
                    Load ABI from verified contract
                  </Button>
                </Group>
              </Stack>
            </form>
          </Fieldset>
          <Fieldset
            legend={
              <Group gap='sm'>
                JSON ABI
                <ActionIcon
                  aria-label='Maximize JSON ABI editor'
                  onClick={() => {
                    openModal();
                  }}
                  variant='outline'
                  color='gray.8'
                  size='sm'
                >
                  <CgMaximizeAlt />
                </ActionIcon>
              </Group>
            }
          >
            <OptionalPortal
              withinPortal={modalOpened}
              target={`#json-abi-modal-${id}-body`}
            >
              <EditorAbiJson
                path={`abi-${id}.json`}
                value={abiStr}
                onChange={setAbiStr}
                height={modalOpened ? (isMobile ? '100dvh' : '75dvh') : 300}
              />
            </OptionalPortal>
          </Fieldset>
        </SimpleGrid>

        <Modal
          id={`json-abi-modal-${id}`}
          title='JSON Abi'
          centered
          opened={modalOpened}
          onClose={closeModal}
          fullScreen={isMobile}
          size='min(90%, 800px)'
          keepMounted={true}
        />
        {fetchAbi.error && (
          <Accordion
            chevronPosition='left'
            variant='contained'
            mt='md'
            c='red'
            bg='red.1'
            defaultValue='error'
          >
            <AccordionItem value='error'>
              <AccordionControl>
                <Text c='red' fw='bold'>
                  Error fetching ABI from Etherscan
                </Text>
              </AccordionControl>
              <AccordionPanel>{fetchAbi.error.message}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        {abi && (
          <Fieldset legend='Methods' mt='md' style={{ breakInside: 'avoid' }}>
            {abi.error && (
              <Alert color='red' variant='outline'>
                {abi.error.message}
              </Alert>
            )}
            {abi.data && (
              <Accordion
                chevronPosition='left'
                multiple={true}
                variant='separated'
              >
                {abi.data?.map((method) => {
                  if (method.type !== 'function') {
                    return null;
                  }
                  return (
                    <ContractFunction
                      chainId={chains.get(form.values.chain)!}
                      abi={abi.data!}
                      address={form.values.address}
                      key={method.name}
                      fn={method}
                    />
                  );
                })}
              </Accordion>
            )}
          </Fieldset>
        )}
      </Container>
    </>
  );
};

export const EditorAbiJson: React.FC<Readonly<EditorProps>> = (props) => {
  return (
    <Editor
      height={300}
      defaultLanguage='json'
      defaultValue='[]'
      beforeMount={(monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          schemas: [
            {
              uri: 'https://ctison.dev/abi.schema.json',
              fileMatch: ['*'],
              schema: abiSchema,
            },
          ],
        });
      }}
      options={{
        minimap: { enabled: false },
        bracketPairColorization: { enabled: true },
        tabSize: 2,
      }}
      {...props}
    />
  );
};

interface ContractFunctionProps {
  chainId: number;
  abi: Abi;
  address: string;
  fn: Abi[number] & { type: 'function' };
}

export const ContractFunction: React.FC<Readonly<ContractFunctionProps>> = ({
  chainId,
  abi,
  address,
  fn,
}) => {
  const { chain } = useAccount();
  const form = useForm({
    initialValues: {
      value: '',
      inputs: fn.inputs.map(() => ''),
    },
    validateInputOnChange: true,
    validate: {
      value: (value) => {
        try {
          parseUnits(value, chain?.nativeCurrency.decimals ?? 18);
          return null;
        } catch (e) {
          return (e as Error).message;
        }
      },
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
  const { mutate: interactContract, ...interactContractMutation } = useMutation(
    {
      mutationFn: async ({ value, inputs }: typeof form.values) => {
        console.log(chainId, address, fn.name, inputs);
        if (isReadFn) {
          const result = await publicClient?.readContract({
            abi,
            address: address as `0x${string}`,
            functionName: fn.name,
            args: inputs.length > 0 ? inputs : undefined,
          });
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          return `${result}`;
        } else {
          const result = await walletClient.data!.writeContract({
            abi,
            address: address as `0x${string}`,
            functionName: fn.name,
            args: inputs.length > 0 ? inputs : undefined,
            value: parseUnits(
              value,
              chain?.nativeCurrency.decimals ?? 18,
            ) as unknown as undefined,
          });
          return result;
        }
      },
    },
  );
  return (
    <Accordion.Item key={fn.name} value={fn.name}>
      <Accordion.Control>
        <InlineCodeHighlight code={formatSoliditySignature(fn)} language='ts' />
      </Accordion.Control>
      <Accordion.Panel>
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(JSON.stringify(values, undefined, 2));
            interactContract(values);
          })}
        >
          <Stack>
            {!isReadFn && (
              <TextInput
                label={`Send ${chain?.nativeCurrency.symbol}`}
                description='Optionally send native currency with this transaction.'
                placeholder='0.0'
                {...form.getInputProps('value')}
              />
            )}
            {fn.inputs.map((input, idx) => {
              return (
                <TextInput
                  // eslint-disable-next-line @eslint-react/no-array-index-key
                  key={idx}
                  label={`${input.name || '_'}: ${input.type}${
                    input.internalType ? ` (${input.internalType})` : ''
                  }`}
                  disabled={interactContractMutation.isPending}
                  {...form.getInputProps(`inputs.${idx}`)}
                />
              );
            })}
            <Web3ButtonConnect
              disableConnect={isReadFn}
              chainId={chainId}
              type='submit'
              miw='20%'
              style={{ alignSelf: 'baseline' }}
              loading={interactContractMutation.isPending}
            >
              {isReadFn ? 'Read' : 'Write'}
            </Web3ButtonConnect>
            {interactContractMutation.error && (
              <Alert
                title={interactContractMutation.error.name}
                color='red'
                variant='outline'
                withCloseButton={true}
                onClose={() => {
                  interactContractMutation.reset();
                }}
              >
                {interactContractMutation.error.message}
              </Alert>
            )}
            {interactContractMutation.data && (
              <CodeHighlight
                language='json'
                code={interactContractMutation.data}
              />
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
      ? ` returns (${fn.outputs
          .map(
            (output) => `${output.type}${output.name ? ` ${output.name}` : ''}`,
          )
          .join(', ')})`
      : ''
  }`;
}

async function etherscanFetchAbi(
  chain: number,
  apiKey: string,
  address: string,
) {
  const data = await fetch(
    'https://api.etherscan.io/v2/api' +
      `?chainid=${chain}` +
      `&apikey=${apiKey}` +
      '&module=contract&action=getabi' +
      `&address=${address}`,
  );
  if (!data.ok) {
    throw new Error(
      `Failed to fetch ABI: ${data.status}: ${await data.text()}`,
    );
  }
  const text = await data.text();
  try {
    const { result } = JSON.parse(text) as { result: string };
    const abi = JSON.parse(result) as Abi;
    return abi;
  } catch {
    throw new Error(`Failed to parse ABI:\n${text}`);
  }
}
