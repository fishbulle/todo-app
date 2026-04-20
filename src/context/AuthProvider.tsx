import {
  useState,
  type ReactNode,
} from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userId,
    setUserId,
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