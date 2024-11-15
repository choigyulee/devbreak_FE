import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();  // useAuth를 통해 로그인 상태 확인
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // 로그인되지 않았다면 로그인 페이지로 리디렉션
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // 로그인되지 않았다면 렌더링하지 않음 (리디렉션 처리)
    return null;
  }

  return element; // 로그인된 경우에는 해당 element를 렌더링
};

export default PrivateRoute;

