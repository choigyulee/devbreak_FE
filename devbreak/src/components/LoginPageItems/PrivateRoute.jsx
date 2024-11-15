// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../AuthContext";

// const PrivateRoute = ({ element }) => {
//   const { isLoggedIn } = useAuth();  // useAuth를 통해 로그인 상태 확인
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       // 로그인되지 않았다면 로그인 페이지로 리디렉션
//       navigate("/login");
//     }
//   }, [isLoggedIn, navigate]);

//   if (!isLoggedIn) {
//     // 로그인되지 않았다면 렌더링하지 않음 (리디렉션 처리)
//     return null;
//   }

//   return element; // 로그인된 경우에는 해당 element를 렌더링
// };

// export default PrivateRoute;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

// 로그인 상태 확인 후 접근을 제어하는 컴포넌트
const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");  // 로그인되지 않았다면 로그인 페이지로 리디렉션
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;  // 로그인되지 않으면 렌더링하지 않음
  }

  return element;  // 로그인된 경우에는 해당 element를 렌더링
};

export default PrivateRoute;
