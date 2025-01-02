import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import getAuthGithub from '../APIs/get/getAuthGithub';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const GithubLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    const handleGithubAuth = async () => {
      try {
        // GitHub OAuth 인증 처리
        const { accessToken, refreshToken } = await getAuthGithub();
        
        // 토큰 저장
        Cookies.set('accessToken', accessToken, { expires: 7, path: '/' });
        Cookies.set('refreshToken', refreshToken, { expires: 7, path: '/' });
        Cookies.set('isLoggedIn', 'true', { expires: 7, path: '/' });

        // useAuth의 login 함수를 호출하여 상태 업데이트
        login(accessToken, refreshToken);

        const loginRedirectPath = Cookies.get('loginRedirectPath') || '/home';

        navigate(loginRedirectPath);
      } catch (err) {
        console.error('GitHub 인증 실패:', err);
        navigate('/login');  
      } finally {
        setLoading(false);
      }
    };

    handleGithubAuth();
  }, [navigate, login]);

  if (loading) {
    return (
      <Container>
        <LoadingText>GitHub 인증 처리 중...</LoadingText>
      </Container>
    );
  }

  return <div>GitHub 로그인 중...</div>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export default GithubLogin;
