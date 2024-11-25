'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import { Button, Textarea, Title } from '@mantine/core';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useCallback, useMemo, useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';

export const SignMessage: React.FC = () => {
  const { address } = useAccount();
  const isLoggedIn = useMemo(() => address !== undefined, [address]);
  const { open: openConnectModal } = useWeb3Modal();
  const { data: walletClient } = useWalletClient();

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signError, setSignError] = useState<Error | null>(null);

  const handleSign = useCallback(async () => {
    if (!isLoggedIn) {
      openConnectModal();
      return;
    }
    try {
      setIsSigning(true);
      setSignError(null);
      setSignedMessage(null);
      const signature = await walletClient!.signMessage({ message });
      setSignedMessage(signature);
    } catch (e) {
      setSignError(e as Error);
    } finally {
      setIsSigning(false);
    }
  }, [isLoggedIn, openConnectModal, message, walletClient]);

  return (
    <>
      <Title mb='lg'>Sign a message</Title>
      <Textarea
        label='Message'
        description="This message you're signing proves you own the address you say you do."
        minRows={5}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        error={signError?.message}
        disabled={isSigning}
        placeholder='Type a message to sign here.'
        required
      />
      <Button
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={isSigning}
        disabled={isLoggedIn && message.length === 0}
        suppressHydrationWarning
        color={isLoggedIn ? undefined : 'black'}
      >
        {isLoggedIn ? 'Sign' : 'Connect Wallet'}
      </Button>
      {signedMessage && (
        <CodeHighlight
          mt='lg'
          code={signedMessage}
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
