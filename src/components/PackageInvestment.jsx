import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { packageService } from '../services/packageService';

function PackageInvestment() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activePackages, setActivePackages] = useState([]);
  const packages = [10, 20, 40, 80, 160, 320, 640, 1280];

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const packages = await packageService.getPackages();
      setActivePackages(packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleInvest = async (amount) => {
    setLoading(true);
    try {
      await packageService.createPackage(amount);
      toast.success(`Successfully invested $${amount}`);
      fetchPackages();
    } catch (error) {
      console.error('Investment error:', error);
      toast.error(error.message || 'Failed to create package');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) {
      return;
    }

    setDeleteLoading(true);
    try {
      await packageService.deletePackage(packageId);
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete package');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Investment Packages</h5>
        <div className="row g-3">
          {packages.map((amount) => (
            <div key={amount} className="col-md-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">${amount}</h5>
                  {amount === 80 && <div className="badge bg-warning mb-2">No Withdrawal</div>}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleInvest(amount)}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Invest Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activePackages.length > 0 && (
          <div className="mt-4">
            <h6>Your Active Packages</h6>
            <div className="list-group">
              {activePackages.map((pkg) => (
                <div key={pkg.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>${pkg.amount}</strong>
                      <small className="text-muted ms-2">
                        Created: {new Date(pkg.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success me-2">
                        Earnings: ${pkg.earnings.toFixed(2)}
                      </span>
                      <span className="badge bg-primary me-2">{pkg.status}</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(pkg.id)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? '...' : '×'}
                      </button>
                    </div>
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