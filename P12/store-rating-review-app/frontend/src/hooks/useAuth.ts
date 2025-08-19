import { useState, useEffect } from 'react';
import axios from '../api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  role?: string;
}

interface AuthHook {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, address: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthHook => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const signup = async (name: string, email: string, password: string, address: string) => {
    try {
      setError(null);
      const response = await axios.post('/auth/signup', { name, email, password, address });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: verify token and fetch user info
      axios
        .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, login, signup, logout };
};

export default useAuth;
