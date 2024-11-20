import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtoms";

const LoginCheck = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useRecoilValue(authState); // Recoil 상태로 로그인 여부 확인

  useEffect(() => {
    if (!isLoggedIn) {
      // 로그인하지 않은 상태에서 접근 시 로그인 페이지로 리디렉션
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // 로그인 상태가 아닐 때는 렌더링하지 않음
    return null;
  }

  return <>{children}</>; // 로그인한 사용자에게만 자식 컴포넌트를 렌더링
};

export default LoginCheck;
