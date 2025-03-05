import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { FaCalculator, FaCalendarAlt } from 'react-icons/fa';
import { BaseConverter } from './BaseConverter';
import { DateCalculator } from './DateCalculator';
import { PiMathOperationsFill } from 'react-icons/pi';

export const CalculatorIcon = FaCalculator;

export const Calculator: React.FC = () => {
  return (
    <div className='mx-auto my-6 max-w-3xl px-2'>
      <Tabs defaultValue='base' classNames={{ panel: '!pt-8' }}>
        <TabsList display='flex' grow>
          <TabsTab value='base' leftSection={<PiMathOperationsFill />}>
            Base Converter
          </TabsTab>
          <TabsTab value='date' leftSection={<FaCalendarAlt />}>
            Date Calculator
          </TabsTab>
        </TabsList>
        <TabsPanel value='base'>
          <BaseConverter />
        </TabsPanel>
        <TabsPanel value='date'>
          <DateCalculator />
        </TabsPanel>
      </Tabs>
    </div>
  );
};

export default Calculator;
