'use client';

import { Button } from '@mantine/core';
import { useState } from 'react';

export const Counter: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Button onClick={() => setCounter((n) => n + 1)}>Increment</Button>
      <span>{counter}</span>
    </>
  );
};
