import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || '';
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  const authContextValue = {
    username,
    setUsername,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};