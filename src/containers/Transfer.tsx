import { ethers } from 'ethers';
import { useState } from 'react';
import { Button, Form } from '../components';
import Input from '../components/Input.tsx';
import Paragraph from '../components/P.tsx';

interface Props {
  onSubmit: (recipient: string) => void;
  mintedAmount: bigint;
  disabled: boolean;
}

function Transfer({ onSubmit, mintedAmount, disabled }: Props) {
  const [recipient, setRecipient] = useState<string>('');

  const submit = () => {
    if (!recipient || !ethers.isAddress(recipient)) {
      throw new Error('Invalid recipient address');
    }

    onSubmit(recipient);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Paragraph>Minted Amount: {Number(mintedAmount) / 10 ** 18}</Paragraph>
      <Input
        disabled={disabled}
        label='Recipient Address'
        placeholder='0x...'
        type='text'
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Button disabled={disabled}>Transfer Tokens</Button>
    </Form>
  );
}

export default Transfer;
