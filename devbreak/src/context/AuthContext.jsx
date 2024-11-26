// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 초기 로그인 상태 체크
    const checkAuth = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = sessionStorage.getItem('refreshToken');
      setIsLoggedIn(!!accessToken && !!refreshToken);
    };

    checkAuth();
  }, []);

  const login = (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

// 액세스 토큰 갱신 함수
const refreshTokenAndLogin = async () => {
  try {
    const accessToken = await refreshAccessToken();
    sessionStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true); // 액세스 토큰 갱신 후 로그인 상태 유지
    return accessToken;  // 갱신된 토큰 반환
  } catch (error) {
    logout();  // 리프레시 토큰 갱신 실패 시 로그아웃
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