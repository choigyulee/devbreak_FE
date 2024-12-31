import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 초기 로그인 상태 체크
    const checkAuth = () => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      setIsLoggedIn(!!accessToken && !!refreshToken); // 두 토큰이 모두 존재하면 로그인 상태로 간주
    };

    checkAuth(); // 컴포넌트 로드 시 로그인 상태 체크
  }, []);

  const login = (accessToken, refreshToken) => {
    Cookies.set('accessToken', accessToken, { expires: 7, path: '/home' });  // 쿠키에 액세스 토큰 저장
    Cookies.set('refreshToken', refreshToken, { expires: 7, path: '/home' }); // 쿠키에 리프레시 토큰 저장
    setIsLoggedIn(true);  // 로그인 상태 true로 설정
  };

  const logout = () => {
    console.log('Logging out, removing tokens');
    Cookies.remove('accessToken'); // 쿠키에서 accessToken 제거
    Cookies.remove('refreshToken'); // 쿠키에서 refreshToken 제거
    setIsLoggedIn(false); // 로그인 상태 false로 설정
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
