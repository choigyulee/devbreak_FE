import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import getAuthStatus from '../APIs/get/getAuthStatus';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const cookies = new Cookies();
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  // 서버에 토큰 유효성 확인 요청
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        console.log('서버 응답:', status);

        if (status.loggedIn) {
          setIsLoggedIn(true);
          cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
          cookies.set('accessToken', status.accessToken, { expires: expires, path: '/' });
          cookies.set('refreshToken', status.refreshToken, { expires: expires, path: '/' });
        }
      } catch (error) {
        console.error('토큰 검증 실패:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);


  const login = () => {
    setIsLoggedIn(true);
    cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
  };

  const logout = () => {
    cookies.remove('isLoggedIn');
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    setIsLoggedIn(false);
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
