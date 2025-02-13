import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get('/api/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      toast.error('Failed to fetch portfolio data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Portfolio</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Your Assets</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Balance</th>
                        <th>Value (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.map((asset) => (
                        <tr key={asset.symbol}>
                          <td>{asset.symbol}</td>
                          <td>{asset.balance}</td>
                          <td>${asset.usdValue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio; 