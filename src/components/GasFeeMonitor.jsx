import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

function GasFeeMonitor() {
  const [gasPrice, setGasPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const price = await provider.getGasPrice();
        setGasPrice(ethers.utils.formatUnits(price, 'gwei'));
      } catch (error) {
        console.error('Error fetching gas price:', error);
        toast.error('Failed to fetch gas price');
      } finally {
        setLoading(false);
      }
    };

    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Current Gas Price</h5>
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <h3 className="mb-0">{parseFloat(gasPrice).toFixed(2)}</h3>
            <span className="ms-2">Gwei</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GasFeeMonitor; 