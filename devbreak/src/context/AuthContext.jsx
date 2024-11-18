import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (tokens) => {
    const { accessToken, refreshToken } = tokens;
    
    // Store tokens in cookies with proper expiration
    Cookies.set('accessToken', accessToken, { expires: 1 }); // 1 day
    Cookies.set('refreshToken', refreshToken, { expires: 30 }); // 30 days
    
    setIsAuthenticated(true);

    const prevPath = '/workspace'; // 기본값을 home으로 설정
    window.location.href = prevPath;
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
