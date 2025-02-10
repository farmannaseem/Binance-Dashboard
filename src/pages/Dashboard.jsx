import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import WalletConnection from '../components/WalletConnection';
import TokenTracker from '../components/TokenTracker';
import GasFeeMonitor from '../components/GasFeeMonitor';
import PackageInvestment from '../components/PackageInvestment';
import Withdrawal from '../components/Withdrawal';
import TransactionHistory from '../components/TransactionHistory';

function Dashboard() {
  const [marketData, setMarketData] = useState({
    btcPrice: 0,
    ethPrice: 0,
    volume24h: 0,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/api/market/overview');
        if (response.data) {
          setMarketData({
            btcPrice: response.data.btcPrice || 0,
            ethPrice: response.data.ethPrice || 0,
            volume24h: response.data.volume24h || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
        toast.error('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    // Set up interval to fetch data every minute
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setUser(response.data);
          setAccount(response.data.address);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          toast.error('Failed to fetch user data');
        }
      }
    };

    fetchUserData();
  }, []);

  const formatNumber = (num) => {
    return (num || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <WalletConnection />
        </div>
        <div className="col-md-6">
          <GasFeeMonitor />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <TokenTracker />
        </div>
      </div>

      <h2 className="mb-4">Market Overview</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="dashboard-stats">
              <h5>Bitcoin Price</h5>
              <h3>${formatNumber(marketData.btcPrice)}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-stats">
              <h5>Ethereum Price</h5>
              <h3>${formatNumber(marketData.ethPrice)}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-stats">
              <h5>24h Volume</h5>
              <h3>${formatNumber(marketData.volume24h)}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Price Chart</h5>
              <div className="chart-placeholder" style={{ height: '300px', background: '#f8f9fa' }}>
                Chart coming soon...
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Trades</h5>
              <div className="list-group">
                <div className="text-center text-muted py-3">
                  No recent trades
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <PackageInvestment />
        </div>
        <div className="col-md-4">
          <Withdrawal earnings={user?.earnings || 0} onWithdraw={() => fetchUserData()} />
        </div>
      </div>

      {account && (
        <div className="row mb-4">
          <div className="col-12">
            <TransactionHistory address={account} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 