import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import getAuthGithub from '../APIs/get/getAuthGithub';
import styled from '@emotion/styled';

const GithubLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGithubAuth = async () => {
      try {
        // getAuthGithub 함수 호출로 GitHub 인증 처리
        const { accessToken, refreshToken } = await getAuthGithub();

        if (!accessToken || !refreshToken) {
          throw new Error('GitHub 인증 토큰이 잘못되었습니다.');
        }

        // 로그인 상태 업데이트
        login({
          accessToken,
          refreshToken,
          grantType: 'Bearer',
          expiresIn: 3600, // 실제로 expiresIn을 받는지 확인 필요
        });

        // 이전 페이지 정보가 있다면 해당 페이지로, 없다면 홈으로 이동
        const prevPath = sessionStorage.getItem('prevPath') || '/home';
        navigate(prevPath, { replace: true });
        sessionStorage.removeItem('prevPath');
      } catch (err) {
        console.error('GitHub OAuth Error:', err);
        if (err.response?.status === 400) {
          setError('잘못된 요청입니다.');
        } else if (err.response?.status === 500) {
          setError('로그인 처리 중 오류가 발생했습니다.');
        } else {
          setError('GitHub 인증 처리 중 오류가 발생했습니다.');
        }

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    handleGithubAuth();
  }, [navigate, login]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
        <LoadingText>GitHub 인증 처리 중...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <RedirectText>5초 후 로그인 페이지로 이동합니다...</RedirectText>
      </Container>
    );
  }

  return null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const LoadingSpinner = styled.div`
  /* Add your spinner styling here */
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
`;

const RedirectText = styled.div`
  font-size: 1.2rem;
`;

export default GithubLogin;
