import { useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useAuth } from '../context/AuthContext';

const BEP20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

function TokenTransfer({ tokenAddress, tokenSymbol, decimals }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Connect to BSC network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Create contract instance
      const tokenContract = new ethers.Contract(tokenAddress, BEP20_ABI, signer);
      
      // Convert amount to token decimals
      const amountInWei = ethers.utils.parseUnits(amount, decimals);
      
      // Send transaction
      const tx = await tokenContract.transfer(recipient, amountInWei);
      toast.info('Transaction submitted. Waiting for confirmation...');
      
      // Wait for transaction confirmation
      await tx.wait();
      
      toast.success('Transfer successful!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error(error.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Transfer {tokenSymbol}</h5>
        <form onSubmit={handleTransfer}>
          <div className="mb-3">
            <label className="form-label">Recipient Address</label>
            <input
              type="text"
              className="form-control"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="any"
                min="0"
                required
              />
              <span className="input-group-text">{tokenSymbol}</span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TokenTransfer; 