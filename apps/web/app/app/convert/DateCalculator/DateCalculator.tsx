'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import {
  ActionIcon,
  Autocomplete,
  Fieldset,
  Flex,
  Group,
  NumberInput,
  type OptionsFilter,
  SegmentedControl,
  Stack,
  Tabs,
  Text,
  Tooltip,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

export interface DateCalculatorProps {}

const dateFormat = [
  'String',
  'JSON',
  'ISO 8601',
  'UNIX (milliseconds)',
  'UNIX',
] as const;

const timeRegex = /(?<hours>\d{2}):(?<minutes>\d{2})(:(?<seconds>\d{2}))?/;

export const DateCalculator: React.FC<DateCalculatorProps> = () => {
  const currentTz = useMemo(
    () =>
      `${
        Intl.DateTimeFormat().resolvedOptions().timeZone
      } UTC${new Intl.NumberFormat('en-US', {
        signDisplay: 'always',
      }).format(-new Date().getTimezoneOffset() / 60)}`,
    [],
  );
  const date = useMemo(() => new Date(), []);
  const time = useMemo(
    () =>
      `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
    [date],
  );
  const form = useForm({
    initialValues: {
      date: date,
      time: time,
      timeMs: date.getMilliseconds(),
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      format: '',
    },
    transformValues: ({
      date,
      time,
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      format,
    }) => {
      const timeMatch = time.match(timeRegex);
      return {
        format,
        date: dayjs(date)
          .set('hour', parseInt(timeMatch?.groups?.['hours'] ?? '0'))
          .set('minute', parseInt(timeMatch?.groups?.['minutes'] ?? '0'))
          .set('second', parseInt(timeMatch?.groups?.['seconds'] ?? '0'))
          .add(years, 'year')
          .add(months, 'month')
          .add(weeks, 'week')
          .add(days, 'day')
          .add(hours, 'hour')
          .add(minutes, 'minute')
          .add(seconds, 'second')
          .add(milliseconds, 'millisecond'),
      };
    },
    onValuesChange(values) {
      const { format, date } = form.getTransformedValues(values);
      switch (format) {
        case 'String':
          setResult(date.toString());
          break;
        case 'JSON':
          setResult(date.toJSON());
          break;
        case 'ISO 8601':
          setResult(date.toISOString());
          break;
        case 'UNIX':
          setResult(date.unix().toString());
          break;
        case 'UNIX (milliseconds)':
          setResult(date.valueOf().toString());
          break;
        default:
          setResult(date.format(format));
      }
    },
  });

  // Trigger form onValuesChange on mount
  useEffect(() => {
    form.setFieldValue('format', 'String');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [result, setResult] = useState<string | null>(null);

  const selectFilter: OptionsFilter = useCallback(({ options }) => options, []);

  const [panel, setPanel] = useState('Date');

  return (
    <>
      <Flex justify='stretch' align='stretch' wrap='wrap'>
        <Fieldset legend='Select date and time' pb='xs' w='100%'>
          <Stack align='center' h='100%' gap={5}>
            <DatePicker {...form.getInputProps('date')} />
            <Group wrap='nowrap'>
              <TimeInput
                label='Time'
                withSeconds
                {...form.getInputProps('time')}
              />
              <NumberInput
                label='Milliseconds'
                {...form.getInputProps('timeMs')}
              />
            </Group>
            <Tooltip label='Current Timezone'>
              <Text size='xs' fs='italic' mt='xs'>
                {currentTz}
              </Text>
            </Tooltip>
          </Stack>
        </Fieldset>
        <Fieldset legend='Modifiers' style={{ flexGrow: 1 }}>
          <Stack h='100%' justify='center'>
            <SegmentedControl
              data={['Date', 'Time']}
              value={panel}
              onChange={(e) => {
                setPanel(e);
              }}
            />
            <Tabs value={panel}>
              <Tabs.Panel value='Date'>
                <Stack>
                  {useMemo(
                    () =>
                      ['years', 'months', 'weeks', 'days'].map((input) => (
                        <NumberInput
                          key={input}
                          allowDecimal={false}
                          label={input}
                          className='capitalize'
                          {...form.getInputProps(input)}
                        />
                      )),
                    [form],
                  )}
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value='Time'>
                <Stack>
                  {useMemo(
                    () =>
                      ['hours', 'minutes', 'seconds', 'milliseconds'].map(
                        (input) => (
                          <NumberInput
                            key={input}
                            allowDecimal={false}
                            label={input}
                            className='capitalize'
                            {...form.getInputProps(input)}
                          />
                        ),
                      ),
                    [form],
                  )}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Fieldset>
      </Flex>
      <Fieldset legend='Output'>
        <Autocomplete
          label={
            <Group gap={5}>
              Format
              <Tooltip label='Format documentation'>
                <ActionIcon
                  component='a'
                  variant='subtle'
                  href='https://day.js.org/docs/en/display/format'
                  referrerPolicy='no-referrer'
                  target='_blank'
                  color='gray'
                >
                  <FaCircleInfo />
                </ActionIcon>
              </Tooltip>
            </Group>
          }
          data={dateFormat as unknown as string[]}
          filter={selectFilter}
          {...form.getInputProps('format')}
        />
        {result && <CodeHighlight code={result} language='text' mt='md' />}
      </Fieldset>
    </>
  );
};
