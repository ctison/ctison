'use client';

import { EChart } from '@kbox-labs/react-echarts';
import { registerMap } from 'echarts';
import departments from './departments.geo.json';
import { Fieldset, Paper, SimpleGrid, Slider, Title } from '@mantine/core';
import { useMemo, useState } from 'react';
import populationByDepartments from './population_by_departments.json';

registerMap('France', departments);

const timeline = [] as string[];
const sliderMarks = [] as { value: number; label?: React.ReactNode }[];

const timelineOpts = (() => {
  const a = [];
  for (let i = 1780; i < 2023; i++) {
    timeline.push(`${i}`);
    sliderMarks.push({
      value: i,
      label: i,
    });
    a.push({
      title: {
        text: `Population in ${i}`,
      },
      series: [
        {
          data: populationByDepartments.map((department) => {
            return {
              name: department.dep,
              value: department[`${i}` as keyof typeof department],
            };
          }),
        },
      ],
    });
  }
  return a;
})();

export default function Page() {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const population = useMemo(() => {
    if (selected) {
      return populationByDepartments[selected];
    }
  }, [selected]);
  const [year, setYear] = useState(2022);
  const data = useMemo(() => {
    return timelineOpts[year - 1780].series[0];
  }, [year]);
  const title = useMemo(() => `Population in ${year}`, [year]);

  return (
    <SimpleGrid cols={{ base: 1, lg: 2 }} p='md'>
      <Paper withBorder p='md'>
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
              max: 1000000,
              inRange: {
                color: [
                  '#313695',
                  '#4575b4',
                  '#74add1',
                  '#abd9e9',
                  '#e0f3f8',
                  '#ffffbf',
                  '#fee090',
                  '#fdae61',
                  '#f46d43',
                  '#d73027',
                  '#a50026',
                ],
              },
              calculable: true,
            },
          ]}
          title={{ text: title }}
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
              ...data,
            },
          ]}
          // @ts-expect-error
          onSelectChanged={(e: any) => {
            setSelected(e.selected[0].dataIndex[0]);
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
        />
      </Paper>
      <Paper withBorder p='md'>
        {population && (
          <>
            <SimpleGrid cols={2}>
              <Fieldset legend={<b>Department</b>}>
                {population.dep} -{' '}
                <span style={{ textTransform: 'capitalize' }}>
                  {population.nomdep.toLowerCase()}
                </span>
              </Fieldset>
              <Fieldset legend={<b>Region</b>}>
                {population.reg} -{' '}
                <span style={{ textTransform: 'capitalize' }}>
                  {population.nomreg.toLowerCase()}
                </span>
              </Fieldset>
            </SimpleGrid>
            {/* <EChart
              dataset={{ source: population }}
              xAxis={{ type: 'category' }}
              yAxis={{}}
            /> */}
          </>
        )}
      </Paper>
    </SimpleGrid>
  );
}
