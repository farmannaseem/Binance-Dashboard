const API_KEY = import.meta.env.VITE_BSCSCAN_API_KEY;

class MarketService {
  async getBitcoinPrice() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      return data.bitcoin.usd;
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      return 0;
    }
  }

  async getEthereumPrice() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      return data.ethereum.usd;
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
      return 0;
    }
  }

  async get24hVolume() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/exchanges/binance');
      const data = await response.json();
      return data.trade_volume_24h_btc;
    } catch (error) {
      console.error('Error fetching 24h volume:', error);
      return 0;
    }
  }

  async getRecentTrades() {
    // Mock data for recent trades
    return [
      { id: 1, type: 'buy', amount: '0.5 BTC', price: '$20,000', time: '2 mins ago' },
      { id: 2, type: 'sell', amount: '1.2 ETH', price: '$1,800', time: '5 mins ago' },
      { id: 3, type: 'buy', amount: '100 USDT', price: '$100', time: '10 mins ago' }
    ];
  }
}

export const marketService = new MarketService(); 