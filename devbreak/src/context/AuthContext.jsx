import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import getAuthStatus from '../APIs/get/getAuthStatus';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const cookies = new Cookies();

  // 서버에 토큰 유효성 확인 요청
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        setIsLoggedIn(status.loggedIn);
      } catch (error) {
        console.error('토큰 검증 실패:', error);
      } finally {
        setLoading(false);  // 로딩 상태 해제
      }
    };

    checkAuthStatus();
  }, []);


  const login = () => {
    setIsLoggedIn(true);
    cookies.set('isLoggedIn', 'true', { expires: 7, path: '/' });
  };

  const logout = () => {
    cookies.remove('isLoggedIn');
    setIsLoggedIn(false); // 로그인 상태 false로 설정
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
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
