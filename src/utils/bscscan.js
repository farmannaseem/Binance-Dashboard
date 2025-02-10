import axios from './axios';
import { BSCSCAN_CONFIG } from '../config/bscscan';

class BSCScanService {
  constructor() {
    this.apiKey = BSCSCAN_CONFIG.API_KEY;
    this.baseURL = BSCSCAN_CONFIG.BASE_URL;
  }

  async getAddressBalance(address) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'balance',
          address,
          apikey: this.apiKey,
          tag: 'latest'
        }
      });
      return response.data;
    } catch (error) {
      console.error('BSCScan balance error:', error);
      throw error;
    }
  }

  async getTokenBalance(address, contractAddress) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'tokenbalance',
          contractaddress: contractAddress,
          address,
          apikey: this.apiKey,
          tag: 'latest'
        }
      });
      return response.data;
    } catch (error) {
      console.error('BSCScan token balance error:', error);
      throw error;
    }
  }

  async getTransactionHistory(address) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 100,
          sort: 'desc',
          apikey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('BSCScan transaction history error:', error);
      throw error;
    }
  }

  async getTokenTransfers(address, contractAddress) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'tokentx',
          contractaddress: contractAddress,
          address,
          page: 1,
          offset: 100,
          sort: 'desc',
          apikey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('BSCScan token transfers error:', error);
      throw error;
    }
  }

  async getGasPrice() {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('BSCScan gas price error:', error);
      throw error;
    }
  }
}

export const bscscanService = new BSCScanService(); 