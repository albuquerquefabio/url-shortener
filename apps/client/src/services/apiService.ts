import axios from 'axios';
import { ApiServiceInterface } from '../interface/ApiServiceInterface';
import { API_BASE_URL } from '../constants/variables';

export class ApiService implements ApiServiceInterface {
  private setAuthToken(token: string) {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token provided');
    }

    if (!window.localStorage) {
      throw new Error('Local storage is not available in this browser');
    }

    try {
      window.localStorage.setItem('authToken', token);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'QuotaExceededError') {
          throw new Error('Local storage is full. Please clear some space.');
        }
        if (error.name === 'SecurityError') {
          throw new Error(
            'Access to local storage is blocked. Please check your privacy settings.'
          );
        }
      }
      throw new Error('Failed to store authentication token');
    }
  }

  async login(username: string, password: string) {
    try {
      const { status, data } = await axios.post<{ access_token: string }>(
        `${API_BASE_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (status !== 200) throw new Error('Login Failed');

      this.setAuthToken(data.access_token);
      await this.getUserData(); // Verify token works immediately
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 0) {
          throw new Error(
            'Unable to reach the server. Please check CORS settings.'
          );
        }
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          throw new Error('Invalid credentials');
        }
      }
      throw error;
    }
  }

  async getUserData<T>() {
    try {
      const { data } = await axios.get<T>(`${API_BASE_URL}/api/auth/me`, {});
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('authToken');
      }
      throw error;
    }
  }

  async logout() {
    try {
      await axios.delete(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('authToken');
    }
  }

  async signup(
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    const { status } = await axios.post(`${API_BASE_URL}/api/users`, {
      name,
      username,
      email,
      password,
    });
    if (status !== 201) throw new Error('Signup Failed');
  }
}
