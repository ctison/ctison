'use client';

import { EChart } from '@kbox-labs/react-echarts';
import {
  Fieldset,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from '@mantine/core';
import { registerMap } from 'echarts';
import { useMemo, useState } from 'react';
import departments from './departments.geo.json';
import populationByDepartments from './population_by_departments.json';

registerMap('France', departments);

const xAxisData = [] as string[];
const populations = [] as { name: string; value: number }[][];

for (let i = 1780; i < 2023; i++) {
  xAxisData.push(`${i}`);
  populations.push(
    populationByDepartments.map((department) => {
      return {
        name: department.dep,
        value: department[`${i}` as keyof typeof department] as number,
      };
    }),
  );
}

export default function Page() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const population = useMemo(() => {
    if (selected !== undefined) {
      return populationByDepartments[selected];
    }
  }, [selected]);
  const [year, setYear] = useState(2022);
  const dataMap = useMemo(() => populations[year - 1780], [year]);
  const dataLine = useMemo(() => {
    if (!population) return [];
    const result = [] as number[];
    for (let i = 1780; i < 2023; i++) {
      result.push(population[`${i}` as keyof typeof population] as number);
    }
    return result;
  }, [population]);
  const title = useMemo(() => `Population in ${year}`, [year]);
  const [rendered, setRendered] = useState(false);

  return (
    <SimpleGrid cols={{ base: 1, lg: 2 }} p='md'>
      <Paper withBorder p='md' pos='relative'>
        <LoadingOverlay visible={!rendered} loaderProps={{ type: 'bars' }} />
        <EChart
          style={{
            height:
              'min(500px, calc(100dvh - var(--app-footer-height) - var(--mantine-spacing-md) * 9))',
          }}
          toolbox={{
            show: true,
            left: 'right',
            top: 'top',
            feature: {
              saveAsImage: {},
            },
          }}
          visualMap={[
            {
              min: 0,
              max: 2_000_000,
              inRange: {
                color: [
                  '#edf2ff',
                  '#dbe4ff',
                  '#bac8ff',
                  '#91a7ff',
                  '#748ffc',
                  '#5c7cfa',
                ],
              },
              calculable: true,
            },
          ]}
          label={{}}
          title={{
            text: title,
            subtext: 'unehistoireduconflitpolitique.fr',
            sublink: 'https://www.unehistoireduconflitpolitique.fr/',
          }}
          series={[
            {
              name: 'Population',
              type: 'map',
              map: 'France',
              roam: true,
              emphasis: {
                label: {
                  show: true,
                },
              },
              selectedMode: 'single',
              data: dataMap,
            },
          ]}
          // @ts-expect-error
          onSelectChanged={(e: any) => {
            setSelected(e.selected[0].dataIndex[0]);
          }}
          onFinished={() => {
            setRendered(true);
          }}
        />
        <Slider
          w='50%'
          mx='auto'
          pos='relative'
          top='-20px'
          min={1780}
          max={2022}
          value={year}
          onChange={setYear}
          marks={[
            { value: 1800, label: 1800 },
            { value: 1900, label: 1900 },
            { value: 2000, label: 2000 },
          ]}
          display={rendered ? undefined : 'none'}
          className='print-hide'
        />
      </Paper>
      <Paper withBorder p='lg'>
        <Text size='18px' fw='bold' ff='sans-serif' c='rgb(70,70,70)'>
          Data from department
        </Text>
        <Stack h='100%' justify='center'>
          {population ? (
            <>
              <SimpleGrid cols={2}>
                <Fieldset legend={<b>Department</b>}>
                  {population.dep} -{' '}
                  <Text span tt='capitalize'>
                    {population.nomdep.toLowerCase()}
                  </Text>
                </Fieldset>
                <Fieldset legend={<b>Region</b>}>
                  {population.reg} -{' '}
                  <Text span tt='capitalize'>
                    {population.nomreg.toLowerCase()}
                  </Text>
                </Fieldset>
              </SimpleGrid>
              <EChart
                dataset={{ source: population }}
                xAxis={{
                  data: xAxisData,
                  boundaryGap: false,
                }}
                yAxis={{ type: 'value', max: 3_000_000 }}
                series={[
                  {
                    type: 'line',
                    data: dataLine,
                    areaStyle: {},
                  },
                ]}
                axisPointer={{ show: true }}
                // @ts-expect-error
                itemStyle={{
                  decal: {
                    show: true,
                    dashArrayX: [1, 0],
                    dashArrayY: [4, 3],
                    rotation: -Math.PI / 4,
                  },
                }}
              />
            </>
          ) : (
            <Text ta='center' size='xl' mt='xl' c='dimmed'>
              Select a department from map
            </Text>
          )}
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
