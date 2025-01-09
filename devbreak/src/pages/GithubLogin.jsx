import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import getAuthGithub from '../APIs/get/getAuthGithub';
import { useAuth } from '../context/AuthContext';

const GithubLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();

  const handleGithubAuth = async () => {
    try {
      // 인증 처리
      await getAuthGithub();

      login();

      // 로그인 리디렉션 경로 (로컬 스토리지에서 경로를 가져옵니다. 없으면 기본값 '/home')
      const loginRedirectPath = localStorage.getItem('loginRedirectPath') || '/home';
      console.log("리디렉션 경로: ", loginRedirectPath);

      // 리디렉션 경로로 이동
      navigate(loginRedirectPath);
    } catch (err) {
      console.error('GitHub 인증 실패:', err);
      setError('GitHub 인증에 실패했습니다.');
      navigate('/login');  // 인증 실패 시 로그인 페이지로 리디렉션
    } finally {
      setLoading(false);  // 로딩 상태 해제
    }
  };

  useEffect(() => {
    console.log("GithubLogin useEffect 실행됨");
    handleGithubAuth();  // 인증을 수행
  }, [navigate]);

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
