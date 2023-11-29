'use client';

import { CodeHighlight } from '@/_ui/CodeHighlight';
import { Web3ConnectButton } from '@/_ui/Web3ConnectButton';
import { Textarea, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWalletClient } from 'wagmi';

export const SignMessage: React.FC = () => {
  const { data: walletClient } = useWalletClient();
  const [message, setMessage] = useState('');
  const signMessage = useMutation({
    mutationFn: async (message: string) => {
      return await walletClient!.signMessage({ message });
    },
  });
  const handleSign = useCallback(async () => {
    signMessage.mutate(message);
  }, [message, signMessage]);

  return (
    <>
      <Title mb='lg'>Sign a message</Title>
      <Textarea
        label='Message'
        description="This message you're signing proves you own the address you say you do."
        minRows={5}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        error={signMessage.error?.message}
        disabled={signMessage.isPending}
        placeholder='Type a message to sign here.'
        required
      />
      <Web3ConnectButton
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={signMessage.isPending}
        disabled={message.length === 0}
      >
        Sign
      </Web3ConnectButton>
      {signMessage.data && (
        <CodeHighlight mt='lg' code={signMessage.data} language='json' />
      )}
    </>
  );
};
