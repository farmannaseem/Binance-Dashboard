import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

function WalletConnection() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const address = window.ethereum.selectedAddress;
      setAccount(address);
      await fetchBalance(address);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!');
      return;
    }

    setConnecting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      await fetchBalance(address);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  };

  const fetchBalance = async (address) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Balance fetch error:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Wallet Connection</h5>
        {!account ? (
          <button
            className="btn btn-primary"
            onClick={connectWallet}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div>
            <div className="mb-3">
              <strong>Address:</strong>
              <p className="text-break">{account}</p>
            </div>
            <div>
              <strong>BNB Balance:</strong>
              <p>{balance ? `${parseFloat(balance).toFixed(4)} BNB` : 'Loading...'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletConnection; 