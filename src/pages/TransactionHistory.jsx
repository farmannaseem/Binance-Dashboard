import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Transaction History</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Token</th>
                    <th>Status</th>
                    <th>Gas Fee</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.hash}>
                      <td>{format(new Date(tx.timestamp), 'MMM dd, yyyy HH:mm')}</td>
                      <td>{tx.type}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.token}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td>{tx.gasFee} BNB</td>
                      <td>
                        <a 
                          href={`https://bscscan.com/tx/${tx.hash}`} 
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
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory; 