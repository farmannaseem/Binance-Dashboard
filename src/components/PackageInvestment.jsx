import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const PACKAGE_AMOUNTS = [10, 20, 40, 80, 160, 320, 640, 1280];

function PackageInvestment() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('/api/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleInvest = async () => {
    if (!selectedAmount) {
      toast.error('Please select a package amount');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/packages', { amount: selectedAmount });
      console.log('Package created:', response.data);
      toast.success('Package created successfully');
      setSelectedAmount(null);
      fetchPackages(); // Refresh packages list
    } catch (error) {
      console.error('Investment error:', error);
      toast.error(error.response?.data?.message || 'Failed to create package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Investment Packages</h5>
        <div className="row g-3 mb-3">
          {PACKAGE_AMOUNTS.map((amount) => (
            <div key={amount} className="col-md-3">
              <div 
                className={`package-card ${selectedAmount === amount ? 'selected' : ''}`}
                onClick={() => setSelectedAmount(amount)}
              >
                <h3>${amount}</h3>
                {amount === 80 && <span className="badge bg-warning">No Withdrawal</span>}
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleInvest}
          disabled={loading || !selectedAmount}
        >
          {loading ? 'Processing...' : 'Invest Now'}
        </button>

        {packages.length > 0 && (
          <div className="mt-4">
            <h6>Your Active Packages</h6>
            <div className="list-group">
              {packages.filter(p => p.status === 'ACTIVE').map((pkg) => (
                <div key={pkg._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>${pkg.amount}</span>
                    <span className="badge bg-primary">{pkg.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageInvestment; 