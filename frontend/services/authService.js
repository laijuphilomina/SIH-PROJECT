import { apiRequest, setToken, getToken } from './api';

const authService = {
  async login(email, password) {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    setToken(data.token);
    return data;
  },

  async register(name, email, password) {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    setToken(data.token);
    return data;
  },

  async logout() {
    setToken(null);
  },

  async getProfile() {
    const token = getToken();
    return apiRequest('/api/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};

export default authService;
