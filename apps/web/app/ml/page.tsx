'use client';

import { EChart } from '@ctison/react-echarts';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Select,
  Slider,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import tf from '@tensorflow/tfjs';
import { useMemo, useState } from 'react';
import { FaPlay as IconPlay } from 'react-icons/fa6';
import { IoPlaySkipForward as IconStep } from 'react-icons/io5';
import { MdOutlineRefresh as IconRefresh } from 'react-icons/md';

export default function Page() {
  // UX inputs
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      learningRate: 0.03,
      activation:
        'Tanh' satisfies (typeof activations)[number] as (typeof activations)[number],
      regularization:
        'None' satisfies (typeof regularizations)[number] as (typeof regularizations)[number],
      regularizationRate: 0,
      problemType:
        'Classification' satisfies (typeof problemTypes)[number] as (typeof problemTypes)[number],
      numberOfLayers: 1,
      dataType:
        'Circle' satisfies (typeof dataTypes)[(typeof problemTypes)[number]][number] as (typeof dataTypes)[(typeof problemTypes)[number]][number],
    },
  });
  const [layers, layersHandlers] = useListState<tf.layers.Layer>([]);

  // Training state
  const data = useMemo(() => {
    switch (form.values.dataType) {
      case 'Circle':
    }
  }, [form.values.dataType]);
  const [epoch, setEpoch] = useState(0);
  const [training, setTraining] = useState(false);
  const tfModel = useMemo(() => {
    const model = tf.sequential();
    for (const nodeModel of layers) {
      model.add(nodeModel);
    }
    model.compile({
      loss: 'meanSquaredError',
      optimizer: 'sgd',
    });
    return model;
  }, [layers]);

  // useEffect(() => {
  //   if (training) {
  //     tfModel.fit();
  //   }
  // }, [training]);

  // Form
  const onSubmit = useMemo(
    () =>
      formOnSubmit((values) => {
        console.log(values);
      }),
    [formOnSubmit],
  );
  return (
    <>
      <>
        <form onSubmit={onSubmit}>
          <Stack>
            <Group justify='center'>
              <ActionIcon variant='subtle'>
                <IconRefresh />
              </ActionIcon>
              <ActionIcon variant='filled'>
                <IconPlay />
              </ActionIcon>
              <ActionIcon variant='subtle'>
                <IconStep />
              </ActionIcon>
              <Stack>
                <Text>Epoch</Text>
                <Text>{epoch}</Text>
              </Stack>
              <Group>
                <NumberInput
                  label='Learning rate'
                  {...form.getInputProps('learningRate')}
                />
                <Select
                  label='Activation'
                  data={activations as unknown as string[]}
                  {...form.getInputProps('activation')}
                />
                <Select
                  label='Regularization'
                  data={regularizations as unknown as string[]}
                  {...form.getInputProps('regularization')}
                />
                <NumberInput
                  label='Regularization rate'
                  {...form.getInputProps('regularizationRate')}
                />
                <Select
                  label='Problem type'
                  data={problemTypes as unknown as string[]}
                  {...form.getInputProps('problemType')}
                />
              </Group>
            </Group>
            <Grid>
              <Grid.Col span={2}>
                <Stack>
                  <Text>Data</Text>
                  <Text>Which datasets do you want to use?</Text>
                  <Select
                    data={
                      dataTypes[form.values.problemType] as unknown as string[]
                    }
                    {...form.getInputProps('dataType')}
                  />
                  <Text>Ratio of training to test data</Text>
                  <Slider step={10} label={(value) => `${value}%`} />
                  <Text>Noise</Text>
                  <Slider step={5} min={0} max={50} />
                  <Text>Batch size</Text>
                  <Slider min={1} max={30} />
                  <Button>Regenerate</Button>
                </Stack>
              </Grid.Col>
              <Grid.Col span={8}>
                <Stack>
                  <Group gap='xl'>
                    <Stack w={124}>
                      <Text>Features</Text>
                      <Text size='xs'>
                        Which properties do you want to feed in?
                      </Text>
                    </Stack>
                    <Stack style={{ flexGrow: '1' }}>
                      <Group justify='center'>
                        <ActionIcon>+</ActionIcon>
                        <ActionIcon>-</ActionIcon>
                        <Text>{form.values.numberOfLayers} LAYERS</Text>
                      </Group>
                      <Box
                        h={5}
                        style={{
                          borderStyle: 'solid',
                          borderWidth: '1px 1px 0px 1px',
                          borderColor: 'gray',
                        }}
                      />
                    </Stack>
                  </Group>
                  {/* <CanvasWidget engine={engine} /> */}
                </Stack>
              </Grid.Col>
              <Grid.Col span={2}>
                <Text>Output</Text>
                <Text>Test loss: #TODO</Text>
                <Text>Training loss: #TODO</Text>
                {/* CANVAS OUTPUT */}
                <EChart
                  options={{
                    xAxis: {
                      min: -6,
                      max: 6,
                    },
                    yAxis: {
                      min: -6,
                      max: 6,
                    },
                    series: [
                      {
                        type: 'scatter',
                        data: [],
                      },
                    ],
                  }}
                />
                <Text>Colors shows data, neuron and weight values</Text>
                <Group>
                  <Checkbox label='Show test data' />
                  <Checkbox label='Discretize output' />
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </form>
      </>
    </>
  );
}

const activations = ['ReLU', 'Tanh', 'Sigmoid', 'Linear'] as const;
const regularizations = ['None', 'L1', 'L2'] as const;
const problemTypes = ['Classification', 'Regression'] as const;

const dataTypes = {
  Classification: ['Circle', 'Exclusive or', 'Gaussian', 'Spiral'] as const,
  Regression: ['Plane', 'Multi Gaussian'] as const,
} satisfies Record<(typeof problemTypes)[number], readonly string[]>;
