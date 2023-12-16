import { SimpleGrid } from '@mantine/core';
import { FaCalculator } from 'react-icons/fa';
import { BaseConverter } from './BaseConverter';
import { DateCalculator } from './DateCalculator';

export const CalculatorIcon = FaCalculator;

export const Calculator: React.FC = () => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <BaseConverter />
      <DateCalculator />
    </SimpleGrid>
  );
};
