const axios = require('axios');

exports.getMarketOverview = async (req, res) => {
  try {
    // Fetch data from Binance API
    const [btcResponse, ethResponse] = await Promise.all([
      axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
      axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
    ]);

    res.json({
      btcPrice: parseFloat(btcResponse.data.price),
      ethPrice: parseFloat(ethResponse.data.price),
      volume24h: 1000000000 // Mock data, replace with actual API call
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market data' });
  }
}; 