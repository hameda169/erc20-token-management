import { ethers } from 'ethers';
import { useState } from 'react';

interface Props {
  onSubmit: (recipient: string) => void;
  mintedAmount: bigint;
}

function Transfer({ onSubmit, mintedAmount }: Props) {
  const [recipient, setRecipient] = useState<string>('');

  const submit = () => {
    if (!recipient || !ethers.isAddress(recipient)) {
      throw new Error('Invalid recipient address');
    }

    onSubmit(recipient);
  };

  return (
    <div>
      <h2>Step 2: Transfer Tokens</h2>
      <p>Minted Amount: {Number(mintedAmount) / 10 ** 18}</p>
      <input type='text' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <button onClick={submit}>Transfer Tokens</button>
    </div>
  );
}

export default Transfer;
