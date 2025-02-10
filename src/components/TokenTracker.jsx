import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const BEP20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

// Common BEP-20 tokens on BSC
const TRACKED_TOKENS = [
  {
    address: '0x55d398326f99059fF775485246999027B3197955', // USDT
    symbol: 'USDT'
  },
  {
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
    symbol: 'BUSD'
  },
  {
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
    symbol: 'USDC'
  }
];

function TokenTracker() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      fetchTokenBalances();
    }
  }, []);

  const fetchTokenBalances = async () => {
    if (!window.ethereum.selectedAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const userAddress = window.ethereum.selectedAddress;

      const tokenPromises = TRACKED_TOKENS.map(async (token) => {
        const contract = new ethers.Contract(token.address, BEP20_ABI, provider);
        const [balance, decimals] = await Promise.all([
          contract.balanceOf(userAddress),
          contract.decimals()
        ]);

        return {
          ...token,
          balance: ethers.utils.formatUnits(balance, decimals)
        };
      });

      const tokenBalances = await Promise.all(tokenPromises);
      setTokens(tokenBalances);
    } catch (error) {
      console.error('Token balance fetch error:', error);
      toast.error('Failed to fetch token balances');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">BEP-20 Tokens</h5>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={fetchTokenBalances}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="list-group">
            {tokens.map((token) => (
              <div key={token.address} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{token.symbol}</strong>
                  <span>{parseFloat(token.balance).toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenTracker; 