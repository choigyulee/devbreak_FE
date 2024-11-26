// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // 초기 로그인 상태 체크
//     const checkAuth = () => {
//       const accessToken = sessionStorage.getItem('accessToken');
//       const refreshToken = sessionStorage.getItem('refreshToken');
//       setIsLoggedIn(!!accessToken && !!refreshToken);
//     };

//     checkAuth();
//   }, []);

//   const login = (accessToken, refreshToken) => {
//     sessionStorage.setItem('accessToken', accessToken);
//     sessionStorage.setItem('refreshToken', refreshToken);
//     sessionStorage.setItem('isLoggedIn', 'true');
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     sessionStorage.removeItem('accessToken');
//     sessionStorage.removeItem('refreshToken');
//     sessionStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//   };

// // 액세스 토큰 갱신 함수
// const refreshTokenAndLogin = async () => {
//   try {
//     const accessToken = await refreshAccessToken();
//     sessionStorage.setItem('accessToken', accessToken);
//     setIsLoggedIn(true); // 액세스 토큰 갱신 후 로그인 상태 유지
//     return accessToken;  // 갱신된 토큰 반환
//   } catch (error) {
//     logout();  // 리프레시 토큰 갱신 실패 시 로그아웃
//     throw error;
//   }
// };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, refreshTokenAndLogin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import getAuthInfo from '../APIs/get/getAuthInfo'; // 추가

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 초기 로그인 상태 체크
    const checkAuth = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = sessionStorage.getItem('refreshToken');
      
      if (accessToken && refreshToken) {
        try {
          // getAuthInfo()로 사용자 정보 가져오기
          const userData = await getAuthInfo();
          setUser({
            userName: userData.userName,
            // userName을 blogId 대신 사용
            blogId: userData.userName // 깃허브 ID를 blogId로 사용
          });
          setIsLoggedIn(true);
        } catch (error) {
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('isLoggedIn', 'true');
    
    try {
      // 로그인 후 사용자 정보 가져오기
      const userData = await getAuthInfo();
      setUser({
        userName: userData.userName,
        blogId: userData.userName // 깃허브 ID를 blogId로 사용
      });
      setIsLoggedIn(true);
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  };

  // 액세스 토큰 갱신 함수
  const refreshTokenAndLogin = async () => {
    try {
      const accessToken = await refreshAccessToken();
      sessionStorage.setItem('accessToken', accessToken);
      
      // 토큰 갱신 후 사용자 정보 다시 가져오기
      const userData = await getAuthInfo();
      setUser({
        userName: userData.userName,
        blogId: userData.userName // 깃허브 ID를 blogId로 사용
      });
      setIsLoggedIn(true);
      
      return accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user,  
      login, 
      logout, 
      refreshTokenAndLogin 
    }}>
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

// refreshAccessToken 함수는 별도로 구현해야 합니다.
const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const response = await axiosInstance.post('/api/auth/refresh', { refreshToken });
    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    throw error;
  }
};