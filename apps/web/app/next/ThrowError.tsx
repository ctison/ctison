'use client';

import { Button } from '@mantine/core';

export const ThrowError: React.FC = () => {
  return (
    <Button
      onClick={() => {
        throw new Error('Error');
      }}
    >
      Throw Error from event handler
    </Button>
  );
};
