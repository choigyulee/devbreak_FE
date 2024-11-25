// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';

// function LoginCheck({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // 세션 스토리지에서 로그인 여부 확인
//     const accessToken = sessionStorage.getItem("accessToken");
//     if (accessToken) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   if (!isLoggedIn) {
//     // 로그인되지 않은 경우 로그인 페이지로 리디렉션
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default LoginCheck;
