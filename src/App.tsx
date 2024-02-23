import { useState } from 'react';
import { Eip1193Provider, ethers } from 'ethers';
import Contract from './contract.json';
import './App.scss'

async function getContract(): Promise<ethers.Contract> {
  const ethProvider = new ethers.BrowserProvider((window as unknown as { ethereum: Eip1193Provider }).ethereum);
  const signer = await ethProvider.getSigner();
  return new ethers.Contract(Contract.address, Contract.abi, signer);
}

function App() {
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const mintTokens = async () => {
    try {
      const numericAmount = Number(amount)
      if (!Number.isNaN(numericAmount) && numericAmount <= 0) {
        throw new Error('Invalid amount');
      }

      const tokenContract = await getContract();
      const value = BigInt(numericAmount*10**18)
      const tx = await tokenContract.mint(value);
      await tx.wait();
      setMessage('Tokens minted successfully');
    } catch (err) {
      console.error(err);
      setError('Error minting tokens');
    }
  };

  const transferTokens = async () => {
    try {
      if (!recipient || !ethers.isAddress(recipient)) {
        throw new Error('Invalid recipient address');
      }

      const tokenContract = await getContract();
      const tx = await tokenContract.transfer(recipient, amount);
      await tx.wait();
      setMessage('Tokens transferred successfully');
    } catch (err) {
      setError(`Error transferring tokens: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Token Management</h1>
      <div>
        <h2>Step 1: Mint Tokens</h2>
        <input type="text" value={amount} onChange={(e) => {
          if(!Number.isNaN(Number(e.target.value))) {
            setAmount(e.target.value);
          }
        }} />
        <button onClick={mintTokens}>Mint Tokens</button>
      </div>
      <div>
        <h2>Step 2: Transfer Tokens</h2>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <button onClick={transferTokens}>Transfer Tokens</button>
      </div>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App
