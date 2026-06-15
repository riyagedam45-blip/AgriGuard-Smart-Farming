import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getProfile } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('agriguard_token'));
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { user: profile } = await getProfile();
          setUser(profile);
        } catch {
          localStorage.removeItem('agriguard_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('agriguard_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerUser(name, email, password);
    localStorage.setItem('agriguard_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('agriguard_token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
