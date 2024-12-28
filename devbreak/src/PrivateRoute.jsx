import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // 여기서 사용

const PrivateRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  // 인증 상태 확인

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
