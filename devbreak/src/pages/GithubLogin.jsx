import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import getAuthGithub from '../APIs/get/getAuthGithub';

const GithubLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGithubAuth = async () => {
      try {
        // GitHub OAuth 인증 처리
        const { accessToken, refreshToken } = await getAuthGithub();

        // 로그인 성공 시 세션 스토리지에 토큰 저장
        handleLoginSuccess(accessToken, refreshToken);
      } catch (err) {
        console.error('GitHub 인증 실패:', err);
        setLoading(false);
      }
    };

    handleGithubAuth();
  }, [navigate]);

  const handleLoginSuccess = (accessToken, refreshToken) => {
    // 세션 스토리지에 accessToken과 refreshToken 저장
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    // 로그인 상태 업데이트: isLoggedIn 상태를 세션 스토리지에 저장
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // /home으로 리디렉션
    navigate('/home');
  };

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
