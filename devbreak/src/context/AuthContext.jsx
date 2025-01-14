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
        if (status.loggedIn) {
          setIsLoggedIn(true);
          cookies.set('isLoggedIn', 'true', { expires: 7, path: '/' });

          // 필요한 경우 액세스 토큰과 리프레시 토큰을 쿠키에 저장
          if (status.accessToken && status.refreshToken) {
            cookies.set('accessToken', status.accessToken, { path: '/', expires: 7 });
            cookies.set('refreshToken', status.refreshToken, { path: '/', expires: 7 });
          }
        }
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

    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      cookies.set('accessToken', accessToken, { expires: 7, path: '/' });
    }
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
