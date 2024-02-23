import { useState } from 'react';

interface Props {
  onSubmit: (amount: number) => void;
}

function Mint({ onSubmit }: Props) {
  const [amount, setAmount] = useState<string>('');

  const submit = () => {
    const numericAmount = Number(amount);
    if (!Number.isNaN(numericAmount) && numericAmount <= 0) {
      throw new Error('Invalid amount');
    }
    onSubmit(numericAmount);
  };

  return (
    <div>
      <h2>Step 1: Mint Tokens</h2>
      <input
        type='text'
        value={amount}
        onChange={(e) => {
          if (!Number.isNaN(Number(e.target.value))) {
            setAmount(e.target.value);
          }
        }}
      />
      <button onClick={submit}>Mint Tokens</button>
    </div>
  );
}

export default Mint;
