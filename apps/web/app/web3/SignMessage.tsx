'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { Button, Textarea, Title } from '@mantine/core';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCallback, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

export const SignMessage: React.FC = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [message, setMessage] = useState('');
  const { data, error, isLoading, signMessage } = useSignMessage({
    message,
  });

  const handleSign = useCallback(() => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    signMessage();
  }, [isConnected, openConnectModal, signMessage]);

  return (
    <>
      <Title my='lg'>Sign a message</Title>
      <Textarea
        label='Message'
        description="This message you're signing proves you own the address you say you do."
        minRows={5}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        error={error?.message}
        disabled={isLoading}
        placeholder='Type a message to sign here.'
        required
      />
      <Button
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={isLoading}
        disabled={isConnected && message.length === 0}
      >
        {isConnected ? 'Sign' : 'Connect Wallet'}
      </Button>
      {data && (
        <CodeHighlight
          mt='lg'
          code={data}
          language='json'
          copyLabel='Copy'
          pr='lg'
          styles={{
            code: {
              wordBreak: 'break-all',
              whiteSpace: 'initial',
            },
          }}
        />
      )}
    </>
  );
};
