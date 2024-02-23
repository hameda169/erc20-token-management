import { useState } from 'react';
import { Eip1193Provider, ethers } from 'ethers';
import Contract from './contract.json';
import './App.scss';
import { Mint, Transfer } from './containers';

async function getContract(): Promise<ethers.Contract> {
  const ethProvider = new ethers.BrowserProvider((window as unknown as { ethereum: Eip1193Provider }).ethereum);
  const signer = await ethProvider.getSigner();
  return new ethers.Contract(Contract.address, Contract.abi, signer);
}

type RequestState =
  | { state: 'INIT'; message?: undefined; error?: undefined }
  | { state: 'LOADING'; message?: undefined; error?: undefined }
  | { state: 'SUCCESS'; message: string; error?: undefined }
  | { state: 'ERROR'; message?: undefined; error: string };

type Stage = 'INIT' | 'MINT' | 'TRANSFER';

function App() {
  const [mintedAmount, setMintedAmount] = useState<bigint>();
  const [requestState, setRequestState] = useState<RequestState>({ state: 'INIT' });
  const [stage, setStage] = useState<Stage>('INIT');

  const start = () => {
    if ((window as unknown as { ethereum: Eip1193Provider | null | undefined }).ethereum == null) {
      setRequestState({ state: 'ERROR', error: "You don't have MetaMask wallet on your browser" });
      return;
    }
    setStage('MINT');
  };

  const mintTokens = async (amount: number) => {
    try {
      setRequestState({ state: 'LOADING' });

      const value = BigInt(amount * 10 ** 18);
      const tokenContract = await getContract();
      const tx = await tokenContract.mint(value);
      await tx.wait();

      setMintedAmount(value);
      setRequestState({ state: 'SUCCESS', message: 'Tokens minted successfully' });
      setTimeout(() => {
        setStage('TRANSFER');
        setRequestState({ state: 'INIT' });
      }, 3000);
    } catch (err) {
      console.error(err);
      setRequestState({ state: 'ERROR', error: 'Error minting tokens' });
    }
  };

  const transferTokens = async (recipient: string) => {
    try {
      setRequestState({ state: 'LOADING' });

      const tokenContract = await getContract();
      const tx = await tokenContract.transfer(recipient, mintedAmount);
      await tx.wait();

      setRequestState({ state: 'SUCCESS', message: 'Tokens transferred successfully' });
      setTimeout(() => {
        setStage('INIT');
        setRequestState({ state: 'INIT' });
      }, 3000);
    } catch (err) {
      console.error(err);
      setRequestState({ state: 'ERROR', error: 'Error transferring tokens' });
    }
  };

  return (
    <div>
      <h1>Token Management</h1>
      {stage === 'INIT' ? <button onClick={start}>Click to Start</button> : null}
      {stage === 'MINT' ? <Mint onSubmit={mintTokens} /> : null}
      {stage === 'TRANSFER' && mintedAmount != null ? (
        <Transfer mintedAmount={mintedAmount} onSubmit={transferTokens} />
      ) : null}
      {requestState.state === 'LOADING' ? 'Loading...' : null}
      {requestState.state === 'SUCCESS' ? <p>{requestState.message}</p> : null}
      {requestState.state === 'ERROR' ? <p style={{ color: 'red' }}>{requestState.error}</p> : null}
    </div>
  );
}

export default App;
