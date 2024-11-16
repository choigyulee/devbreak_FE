// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태가 바뀌면 상태 확인
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || Cookies.get('accessToken');
    setIsLoggedIn(!!token);  // 토큰이 존재하면 로그인 상태
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 세션, 로컬스토리지 및 쿠키에서 토큰 제거
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    Cookies.remove('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
