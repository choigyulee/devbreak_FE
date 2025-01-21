import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import getAuthStatus from '../APIs/get/getAuthStatus';
import postAuthLogout from '../APIs/post/postAuthLogout';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        console.log('서버 응답:', status);

        if (status.loggedIn) {
          setIsLoggedIn(true);
          cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
          console.log('로그인 성공 - 쿠키 설정됨:', cookies.get('isLoggedIn'));
        } else {
          setIsLoggedIn(false);
          cookies.remove('isLoggedIn', { path: '/' });
          console.log('로그인 실패 - 쿠키 제거됨:', cookies.get('isLoggedIn'));
        }
      } catch (error) {
        console.error('토큰 검증 실패:', error.response ? error.response.data : error.message);
        setIsLoggedIn(false);
        cookies.remove('isLoggedIn', { path: '/' });
        alert('세션이 만료되었습니다. 다시 로그인하세요.');
        window.location.reload();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
    console.log('isLoggedIn 쿠키 설정:', cookies.get('isLoggedIn'));
  };

  const logout = async () => {
    try {
      await postAuthLogout();
      setIsLoggedIn(false);
      cookies.remove('isLoggedIn', { path: '/' });
      window.location.reload();
    } catch (logoutError) {
      console.error('로그아웃 요청 실패:', logoutError.response?.data || logoutError.message);
    }
  };

  // 디버깅용 상태 확인 로그
  useEffect(() => {
    console.log('isLoggedIn 상태 변경됨:', isLoggedIn);
  }, [isLoggedIn]);

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
