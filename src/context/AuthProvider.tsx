import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || '';
  });

  useEffect(() => {
    if (token && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username)
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username')
    }
  }, [token, username]);

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