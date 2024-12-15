'use client';

import { type RestMarketTypes } from '@binance/connector-typescript';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  ActionIcon,
  CopyButton,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import { IoIosCheckmark } from 'react-icons/io';
import { LuCopy, LuDownload } from 'react-icons/lu';
import { SiBinance } from 'react-icons/si';
import { Table } from './Table';
export { TradingViewIcon } from './TradingViewIcon';

export const TradingView: React.FC = () => {
  const binanceInfos = useQuery({
    queryKey: ['binanceInfos'],
    queryFn: async () => {
      const response = await fetch(
        'https://data-api.binance.vision/api/v3/exchangeInfo?permissions=SPOT',
      );
      if (!response.ok) {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `Failed to fetch Binance infos: ${response.status} ${response.body ?? ''}`,
        );
      }
      return (await response.json()) as RestMarketTypes.exchangeInformationResponse;
    },
  });

  const symbols = useMemo(() => {
    return binanceInfos.data?.symbols.filter((s) => s.status === 'TRADING');
  }, [binanceInfos.data]);

  const categories = useMemo(() => {
    return symbols?.reduce(
      (acc, symbol) => {
        if (!acc.find((asset) => asset.asset === symbol.quoteAsset)) {
          acc.push({ asset: symbol.quoteAsset });
        }
        return acc;
      },
      [] as { asset: string }[],
    );
  }, [symbols]);

  const [selectedSymbols, setSelectedSymbols] = useState<
    { quoteAsset: string; baseAsset: string; symbol: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { asset: string }[]
  >([]);

  const selectedCount = useMemo(
    () => 1 + selectedCategories.length + selectedSymbols.length,
    [selectedCategories, selectedSymbols],
  );

  const isOver1000 = useMemo(() => selectedCount > 1000, [selectedCount]);

  const watchList = useMemo(() => {
    const acc: Record<string, string[]> = {};
    let _selectedRows = [...selectedSymbols];
    selectedCategories.forEach(({ asset: category }) => {
      acc[category] = [];
      _selectedRows = _selectedRows.filter((row) => {
        if (row.quoteAsset === category || row.baseAsset === category) {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(row.symbol);
          return false;
        }
        return true;
      });
    });
    return [
      `###Main`,
      ..._selectedRows.map((row) => `BINANCE:${row.symbol}`),
      ...Object.entries(acc).map(([category, symbols]) =>
        [
          `###${category}`,
          ...symbols.map((symbol) => `BINANCE:${symbol}`),
        ].join(','),
      ),
    ].join(',');
  }, [selectedCategories, selectedSymbols]);

  return (
    <>
      <Tabs defaultValue='binance' keepMounted={false}>
        <Tabs.List>
          <Text fw={500} size='md' span style={{ alignSelf: 'flex-end' }} p={5}>
            Generate WatchList
          </Text>
          <Tabs.Tab value='binance' leftSection={<SiBinance />}>
            Binance
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='binance' py='md'>
          <Grid>
            <Grid.Col span='auto' className='ag-theme-quartz' h='65dvh'>
              <Table
                _data={symbols}
                _setSelectedData={(data) => {
                  setSelectedSymbols(
                    data as {
                      quoteAsset: string;
                      baseAsset: string;
                      symbol: string;
                    }[],
                  );
                }}
                columnDefs={[{ headerName: 'Symbols', field: 'symbol' }]}
              />
            </Grid.Col>
            <Grid.Col
              span='auto'
              order={{ md: 2 }}
              className='ag-theme-quartz'
              h='65dvh'
            >
              <Table
                _data={categories}
                _setSelectedData={(data) => {
                  setSelectedCategories(data as { asset: string }[]);
                }}
                columnDefs={[{ headerName: 'Categories', field: 'asset' }]}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} h='65dvh'>
              <Stack
                h='100%'
                mah='100%'
                align='stretch'
                bg='gray.0'
                style={{
                  border: 'solid 1px var(--mantine-color-gray-3)',
                  borderRadius: 10,
                  overflow: 'clip',
                }}
                gap={0}
              >
                <Group
                  px='md'
                  pt='xs'
                  pb={5}
                  justify='space-between'
                  style={{
                    borderBottom: 'solid 1px var(--mantine-color-gray-3)',
                  }}
                >
                  <Group>
                    <Text size='sm' fw={500}>
                      Binance.txt
                    </Text>
                    <Tooltip
                      label='TradingView does not allow watch list with more than 1000 symbols'
                      fz='sm'
                      disabled={!isOver1000}
                    >
                      <Group gap={0}>
                        {isOver1000 && (
                          <ThemeIcon variant='subtle' color='red'>
                            <CiWarning />
                          </ThemeIcon>
                        )}
                        <Text size='sm' c={isOver1000 ? 'red' : undefined}>
                          {selectedCount} symbols & categories
                        </Text>
                      </Group>
                    </Tooltip>
                  </Group>
                  <Group gap='sm'>
                    <form method='POST' action='/app/api/tradingview'>
                      <input type='hidden' name='watchList' value={watchList} />
                      <Tooltip fz='sm' label='Download'>
                        <ActionIcon variant='subtle' color='gray' type='submit'>
                          <LuDownload />
                        </ActionIcon>
                      </Tooltip>
                    </form>
                    <CopyButton value={watchList}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} fz='sm'>
                          <ActionIcon
                            onClick={copy}
                            variant='subtle'
                            color='gray'
                          >
                            {copied ? <IoIosCheckmark /> : <LuCopy />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Group>
                <CodeHighlight
                  withCopyButton={false}
                  pt={0}
                  pr='initial'
                  style={{
                    flexGrow: 1,
                    overflowY: 'scroll',
                  }}
                  styles={{
                    code: {
                      wordBreak: 'break-all',
                      whiteSpace: 'initial',
                    },
                  }}
                  language='js'
                  code={watchList}
                />
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
