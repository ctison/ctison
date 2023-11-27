'use client';

import { CodeHighlight } from '@/_ui/CodeHighlight';
import { Button, Textarea, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useCallback, useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';

export const SignMessage: React.FC = () => {
  const { isConnected, isConnecting } = useAccount();
  const { open: openConnectModal } = useWeb3Modal();
  const { data: walletClient } = useWalletClient();
  const [message, setMessage] = useState('');
  const signMessage = useMutation({
    mutationFn: async (message: string) => {
      return await walletClient!.signMessage({ message });
    },
  });
  const handleSign = useCallback(async () => {
    if (!isConnected) {
      openConnectModal();
      return;
    }
    signMessage.mutate(message);
  }, [isConnected, openConnectModal, message, signMessage]);

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
      <Button
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={isConnecting || signMessage.isPending}
        disabled={isConnected && message.length === 0}
        color={isConnected ? undefined : 'black'}
        suppressHydrationWarning
      >
        {isConnected ? 'Sign' : 'Connect Wallet'}
      </Button>
      {signMessage.data && (
        <CodeHighlight mt='lg' code={signMessage.data} language='json' />
      )}
    </>
  );
};
