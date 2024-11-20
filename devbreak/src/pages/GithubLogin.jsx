// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';
// import { authState } from '../atoms/authAtoms';
// import getAuthGithub from '../APIs/get/getAuthGithub';
// import styled from '@emotion/styled';

// const GithubLogin = () => {
//   const navigate = useNavigate();
//   const setAuthState = useSetRecoilState(authState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleGithubAuth = async () => {
//       try {
//         // sessionStorage.setItem('prevPath', window.location.pathname);

//         const { accessToken, refreshToken } = await getAuthGithub();
        
//         // 로그인 상태를 리코일에 업데이트
//         setAuthState({ isLoggedIn: true, accessToken, refreshToken });
  
//         // 이전에 접근한 페이지로 리디렉션
//         const prevPath = sessionStorage.getItem('prevPath') || '/home';
//         navigate(prevPath, { replace: true });

//         // 이전 페이지 기록 삭제
//         sessionStorage.removeItem('prevPath');
//       } catch (err) {
//         console.error('GitHub OAuth Error:', err);
//         setError('GitHub 인증 처리 중 오류가 발생했습니다.');
//         setTimeout(() => navigate('/login', { replace: true }), 5000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     handleGithubAuth();
//   }, [navigate, setAuthState]);

//   if (loading) {
//     return (
//       <Container>
//         <LoadingSpinner />
//         <LoadingText>GitHub 인증 처리 중...</LoadingText>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <ErrorMessage>{error}</ErrorMessage>
//         <RedirectText>5초 후 로그인 페이지로 이동합니다...</RedirectText>
//       </Container>
//     );
//   }

//   return null;
// };

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 60vh;
// `;

// const LoadingSpinner = styled.div`
//   /* Add your spinner styling here */
// `;

// const LoadingText = styled.div`
//   font-size: 1.5rem;
//   color: #333;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   font-size: 1.2rem;
// `;

// const RedirectText = styled.div`
//   font-size: 1.2rem;
// `;

// export default GithubLogin;


// GithubLogin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtoms';
import getAuthGithub from '../APIs/get/getAuthGithub';

const GithubLogin = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGithubAuth = async () => {
      try {
        const { accessToken, refreshToken } = await getAuthGithub();
        
        // 로그인 성공 시 상태 업데이트 및 로컬 스토리지에 토큰 저장
        handleLoginSuccess(accessToken, refreshToken);
      } catch (err) {
        console.error('GitHub 인증 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    handleGithubAuth();
  }, [navigate]);

  const handleLoginSuccess = (accessToken, refreshToken) => {
    setAuth({
      isLoggedIn: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    
    // 로컬 스토리지에 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // 로그인 후 /home으로 리디렉션
    navigate('/home');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>GitHub 로그인 중...</div>;
};

export default GithubLogin;
