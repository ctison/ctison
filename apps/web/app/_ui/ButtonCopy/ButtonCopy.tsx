import classes from './ButtonCopy.module.css';
import {
  ActionIcon,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { useCallback } from 'react';
import { IoCopyOutline } from 'react-icons/io5';

export interface ButtonCopyProps {
  value: string;
}

export const CopyButton: React.FC<ButtonCopyProps> = ({ value }) => {
  const clipboard = useClipboard();
  const copy = useCallback(() => {
    clipboard.copy(value);
  }, [clipboard, value]);

  return (
    <Popover opened={clipboard.copied} position='top' shadow='md'>
      <PopoverTarget>
        <ActionIcon variant='subtle' title='Copy' onClick={copy}>
          <IoCopyOutline />
        </ActionIcon>
      </PopoverTarget>
      <PopoverDropdown>Copied!</PopoverDropdown>
    </Popover>
  );
};
