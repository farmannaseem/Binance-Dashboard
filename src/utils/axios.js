import { mockBackend } from '../services/mockBackend';

const mockAxios = {
  post: async (url, data) => {
    try {
      console.log('mockAxios POST request:', { url, data });
      let response;
      
      if (url === '/auth/login') {
        response = await mockBackend.login(data);
        console.log('mockAxios login response:', response);
      }
      else if (url === '/auth/register') {
        response = await mockBackend.register(data);
        console.log('mockAxios register response:', response);
      }

      if (!response || !response.data) {
        throw new Error('Invalid response format');
      }

      return response;
    } catch (error) {
      console.error('mockAxios error:', error);
      throw {
        response: {
          data: { message: error.message }
        }
      };
    }
  },

  get: async (url) => {
    try {
      let response;
      
      if (url === '/auth/me') {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        const decoded = JSON.parse(atob(token));
        if (Date.now() > decoded.exp) {
          localStorage.removeItem('token');
          throw new Error('Token expired');
        }
        
        response = await mockBackend.getUser(decoded.userId);
      }

      return response;
    } catch (error) {
      throw {
        response: {
          data: { message: error.message }
        }
      };
    }
  }
};

export default mockAxios; 