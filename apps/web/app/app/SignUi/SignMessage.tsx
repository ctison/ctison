import { Web3ButtonConnect } from '@/_ui/Web3ButtonConnect';
import { CodeHighlight } from '@mantine/code-highlight';
import { Fieldset, Textarea } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { History } from '.';

export const SignMessage: React.FC<{
  addHistory: (history: Omit<History, 'id' | 'date'>) => string;
  updateHistory: (id: string, history: Partial<History>) => void;
}> = ({ addHistory, updateHistory }) => {
  const { data: walletClient } = useWalletClient();
  const [message, setMessage] = useState('');
  const signMessage = useMutation({
    mutationFn: async (message: string) => {
      walletClient!.account.address;
      return await walletClient!.signMessage({ message });
    },
    onMutate(message) {
      const address = walletClient!.account.address;
      const id = addHistory({
        type: 'sign',
        address: address as `0x${string}`,
        message,
      });
      return { id };
    },
    onSettled(signature, error, _, ctx) {
      updateHistory(ctx!.id, {
        signature,
        error,
      });
    },
  });
  const handleSign = useCallback(async () => {
    signMessage.mutate(message);
  }, [message, signMessage]);

  return (
    <Fieldset legend='Sign a message'>
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
      <Web3ButtonConnect
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={signMessage.isPending}
        disabled={message.length === 0}
      >
        Sign
      </Web3ButtonConnect>
      {signMessage.data && (
        <CodeHighlight mt='lg' code={signMessage.data} language='json' />
      )}
    </Fieldset>
  );
};
