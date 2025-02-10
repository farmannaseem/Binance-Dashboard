import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Trading() {
  const [order, setOrder] = useState({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/trade', order);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Trading</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Place Order</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Symbol</label>
                  <select
                    className="form-select"
                    value={order.symbol}
                    onChange={(e) => setOrder({ ...order, symbol: e.target.value })}
                  >
                    <option value="BTCUSDT">BTC/USDT</option>
                    <option value="ETHUSDT">ETH/USDT</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Side</label>
                  <select
                    className="form-select"
                    value={order.side}
                    onChange={(e) => setOrder({ ...order, side: e.target.value })}
                  >
                    <option value="BUY">Buy</option>
                    <option value="SELL">Sell</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={order.price}
                    onChange={(e) => setOrder({ ...order, price: e.target.value })}
                    step="0.00000001"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={order.quantity}
                    onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
                    step="0.00000001"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trading; 