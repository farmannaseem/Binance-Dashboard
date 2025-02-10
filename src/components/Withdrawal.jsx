import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Withdrawal({ earnings, onWithdraw }) {
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/packages/withdraw');
      toast.success('Withdrawal processed successfully');
      if (onWithdraw) onWithdraw();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Earnings</h5>
        <div className="mb-3">
          <h3 className="text-success">${earnings}</h3>
          <small className="text-muted">10% withdrawal fee applies</small>
        </div>
        <button
          className="btn btn-success w-100"
          onClick={handleWithdraw}
          disabled={loading || !earnings}
        >
          {loading ? 'Processing...' : 'Withdraw Earnings'}
        </button>
      </div>
    </div>
  );
}

export default Withdrawal; 