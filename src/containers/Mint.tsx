import { useState } from 'react';
import { Button, Form, TextInput } from '../components';

interface Props {
  onSubmit: (amount: number) => void;
  disabled: boolean;
}

function Mint({ onSubmit, disabled }: Props) {
  const [amount, setAmount] = useState<string>('');

  const submit = () => {
    const numericAmount = Number(amount);
    if (!Number.isNaN(numericAmount) && numericAmount <= 0) {
      throw new Error('Invalid amount');
    }
    onSubmit(numericAmount);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <TextInput
        disabled={disabled}
        type='text'
        value={amount}
        label='Amount'
        placeholder='Enter amount'
        onChange={(e) => {
          if (!Number.isNaN(Number(e.target.value))) {
            setAmount(e.target.value);
          }
        }}
      />
      <Button disabled={disabled} type='submit'>
        Mint Tokens
      </Button>
    </Form>
  );
}

export default Mint;
