exports.getPortfolio = async (req, res) => {
  try {
    // Mock portfolio data (replace with actual Binance API integration)
    const portfolio = [
      {
        symbol: 'BTC',
        balance: '0.5',
        usdValue: 20000
      },
      {
        symbol: 'ETH',
        balance: '5',
        usdValue: 10000
      }
    ];

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
}; 