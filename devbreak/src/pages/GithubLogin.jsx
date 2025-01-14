import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import { useAuth } from '../context/AuthContext';

const GithubLogin = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, loading } = useAuth();

  useEffect(() => {
    const handleGithubAuth = async () => {
      if (isLoggedIn) {
        navigate('/home');
        return;
      }

      try {
        login();
        navigate('/home');
      } catch (err) {
        console.error('GitHub 인증 실패:', err);
        navigate('/login');
      }
    };

    handleGithubAuth();
  }, [isLoggedIn, navigate, login]);

  if (loading) {
    return (
      <Container>
        <LoadingText>GitHub 인증 처리 중...</LoadingText>
      </Container>
    );
  }

  return <div>GitHub 로그인 중...</div>;
};

export default GithubLogin;

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
