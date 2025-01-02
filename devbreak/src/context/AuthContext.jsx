import React, { createContext, useContext, useState, useEffect } from 'react';
import postAuthRefresh from '../APIs/post/postAuthRefresh';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 서버에 토큰 유효성 확인 요청


  const login = (accessToken, refreshToken) => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', 'true', { expires: 7, path: '/' });
  };

  const logout = () => {
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false); // 로그인 상태 false로 설정
  };

  // 리프레시 토큰을 이용해 액세스 토큰 갱신 후 로그인 상태 유지
  const refreshTokenAndLogin = async () => {
    try {
      console.log('Refreshing access token using refresh token');
      const accessToken = await postAuthRefresh();
      Cookies.set('accessToken', accessToken);
      setIsLoggedIn(true);
      console.log('Successfully refreshed access token');
      return accessToken;
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, refreshTokenAndLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
