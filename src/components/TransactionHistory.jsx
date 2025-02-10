import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { bscscanService } from '../utils/bscscan';
import { BSCSCAN_CONFIG } from '../config/bscscan';

function TransactionHistory({ address }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      fetchTransactions();
    }
  }, [address]);

  const fetchTransactions = async () => {
    try {
      const response = await bscscanService.getTransactionHistory(address);
      if (response.status === '1') {
        setTransactions(response.result);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value, decimals = 18) => {
    return (parseInt(value) / Math.pow(10, decimals)).toFixed(4);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Transaction History</h5>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Value (BNB)</th>
                  <th>Gas Used</th>
                  <th>Status</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.hash}>
                    <td>{format(new Date(parseInt(tx.timeStamp) * 1000), 'MMM dd, yyyy HH:mm')}</td>
                    <td>{tx.from.toLowerCase() === address.toLowerCase() ? 'Send' : 'Receive'}</td>
                    <td>{formatValue(tx.value)}</td>
                    <td>{formatValue(tx.gasUsed * tx.gasPrice, 18)}</td>
                    <td>
                      <span className={`badge ${tx.isError === '0' ? 'bg-success' : 'bg-danger'}`}>
                        {tx.isError === '0' ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td>
                      <a
                        href={`${BSCSCAN_CONFIG.EXPLORER_URL}/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-truncate d-inline-block"
                        style={{ maxWidth: '100px' }}
                      >
                        {tx.hash}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory; 