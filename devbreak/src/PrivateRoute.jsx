import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인 여부를 확인하는 함수
const isLoggedIn = () => {
  return sessionStorage.getItem('accessToken') && sessionStorage.getItem('refreshToken');
};

const PrivateRoute = ({ element }) => {
  if (isLoggedIn()) {
    return element; // 로그인한 경우, 해당 컴포넌트를 렌더링
  } else {
    return <Navigate to="/login" />; // 로그인하지 않은 경우, 로그인 페이지로 리디렉션
  }
};

export default PrivateRoute;
