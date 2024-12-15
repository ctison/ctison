import { Web3ButtonConnect } from '@/_ui/Web3ButtonConnect';
import { CodeHighlight } from '@mantine/code-highlight';
import { Fieldset, Textarea } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { type History } from '.';

export const SignMessage: React.FC<{
  addHistory: (history: Omit<History, 'id' | 'date'>) => string;
  updateHistory: (id: string, history: Partial<History>) => void;
}> = ({ addHistory, updateHistory }) => {
  const { data: walletClient } = useWalletClient();
  const [message, setMessage] = useState('');
  const { mutate: signMessage, ...signMessageMutation } = useMutation({
    mutationFn: async (message: string) => {
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
  const handleSign = useCallback(() => {
    signMessage(message);
  }, [message, signMessage]);

  return (
    <Fieldset legend='Sign a message'>
      <Textarea
        label='Message'
        description="This message you're signing proves you own the address you say you do."
        minRows={5}
        value={message}
        onChange={(event) => {
          setMessage(event.currentTarget.value);
        }}
        error={signMessageMutation.error?.message}
        disabled={signMessageMutation.isPending}
        placeholder='Type a message to sign here.'
        required
      />
      <Web3ButtonConnect
        mt='lg'
        miw={124}
        onClick={handleSign}
        loading={signMessageMutation.isPending}
        disabled={message.length === 0}
      >
        Sign
      </Web3ButtonConnect>
      {signMessageMutation.data && (
        <CodeHighlight
          mt='lg'
          code={signMessageMutation.data}
          language='json'
        />
      )}
    </Fieldset>
  );
};
