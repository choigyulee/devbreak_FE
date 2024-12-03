import React, { createContext, useContext, useState, useEffect } from 'react';
import postAuthRefresh from '../APIs/post/postAuthRefresh';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 초기 로그인 상태 체크
    const checkAuth = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = sessionStorage.getItem('refreshToken');
      setIsLoggedIn(!!accessToken && !!refreshToken); // 두 토큰이 모두 존재하면 로그인 상태로 간주
    };

    checkAuth(); // 컴포넌트 로드 시 로그인 상태 체크
  }, []);

  const login = (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);  // 액세스 토큰 저장
    sessionStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰 저장
    setIsLoggedIn(true);  // 로그인 상태 true로 설정
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    setIsLoggedIn(false); // 로그인 상태 false로 설정
  };

  // 리프레시 토큰을 이용해 액세스 토큰 갱신 후 로그인 상태 유지
  const refreshTokenAndLogin = async () => {
    try {
      const accessToken = await postAuthRefresh();  // 리프레시 토큰을 이용해 액세스 토큰 갱신
      sessionStorage.setItem('accessToken', accessToken);  // 갱신된 액세스 토큰 저장
      setIsLoggedIn(true); // 로그인 상태 true로 설정
      return accessToken;  // 갱신된 액세스 토큰 반환
    } catch (error) {
      logout(); // 리프레시 토큰 갱신 실패 시 로그아웃 처리
      throw error; // 에러를 호출한 곳으로 전달
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