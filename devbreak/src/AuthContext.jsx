import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('accessToken'));

  const login = (accessToken, refreshToken) => {
    // 액세스 토큰과 리프레시 토큰을 쿠키에 저장
    Cookies.set('accessToken', accessToken, { expires: 1 / 24 }); // 1시간
    Cookies.set('refreshToken', refreshToken, { expires: 7 });  // 7일
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
