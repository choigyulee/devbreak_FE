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
        const { accessToken, refreshToken } = await getAuthGithub();
        login({ accessToken, refreshToken });
  
        const prevPath = sessionStorage.getItem('prevPath') || '/breakthrough';
        navigate(prevPath, { replace: true });
        sessionStorage.removeItem('prevPath');
      } catch (err) {
        console.error('GitHub OAuth Error:', err);
        setError('GitHub 인증 처리 중 오류가 발생했습니다.');
        setTimeout(() => navigate('/login', { replace: true }), 5000);
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
