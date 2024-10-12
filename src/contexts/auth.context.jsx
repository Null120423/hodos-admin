import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback((account) => {
    setUser(account);
    Cookies.set('user', JSON.stringify(account), { expires: 7 }); // Save user info in cookies for 7 days
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('user');
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
