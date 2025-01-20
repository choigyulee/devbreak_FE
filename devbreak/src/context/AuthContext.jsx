import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import getAuthStatus from '../APIs/get/getAuthStatus';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  useEffect(() => {
    // 쿠키에서 로그인 상태 확인
    const checkLoginStatusFromCookies = () => {
      const loggedIn = cookies.get('isLoggedIn');
      if (loggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); // 쿠키 확인 후 loading 상태를 false로 설정
    };

    // 처음에 쿠키 확인 후 로그인 상태 업데이트
    checkLoginStatusFromCookies();

    // 서버로 인증 상태를 확인하는 추가 요청 (선택적)
    const checkAuthStatus = async () => {
      try {
        const status = await getAuthStatus();
        console.log('서버 응답:', status);
        console.log('로그인 상태:', isLoggedIn);

        if (status.loggedIn) {
          setIsLoggedIn(true);
          cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('토큰 검증 실패:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    // 로그인 상태가 확인되었을 때 서버로 인증 상태를 확인 (optional)
    if (!cookies.get('isLoggedIn')) {
      checkAuthStatus();
    }

  }, []);


  const login = () => {
    setIsLoggedIn(true);
    cookies.set('isLoggedIn', 'true', { expires: expires, path: '/' });
  };

  const logout = () => {
    cookies.remove('isLoggedIn');
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
