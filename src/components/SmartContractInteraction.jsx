import { useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

function SmartContractInteraction({ contractAddress, contractABI }) {
  const [functionName, setFunctionName] = useState('');
  const [parameters, setParameters] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      let result;
      if (contract[functionName]) {
        result = await contract[functionName](...parameters);
        if (result._isBigNumber) {
          result = result.toString();
        }
        setResult(result);
        toast.success('Contract call successful');
      } else {
        toast.error('Function not found in contract');
      }
    } catch (error) {
      console.error('Contract call error:', error);
      toast.error(error.message || 'Contract call failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Smart Contract Interaction</h5>
        <div className="mb-3">
          <label className="form-label">Function Name</label>
          <input
            type="text"
            className="form-control"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="e.g., balanceOf"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Parameters (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setParameters(e.target.value.split(',').map(p => p.trim()))}
            placeholder="e.g., 0x123...,100"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleCall}
          disabled={loading}
        >
          {loading ? 'Calling...' : 'Call Function'}
        </button>
        {result && (
          <div className="mt-3">
            <h6>Result:</h6>
            <pre className="bg-light p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartContractInteraction; 