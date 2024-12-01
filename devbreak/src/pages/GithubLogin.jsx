import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import getAuthGithub from '../APIs/get/getAuthGithub';
import { useAuth } from '../context/AuthContext';

const GithubLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleGithubAuth = async () => {
      try {
        // GitHub OAuth 인증 처리
        const { accessToken, refreshToken } = await getAuthGithub();
        
        // 토큰 저장
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('isLoggedIn', 'true');

        // // 상태 저장이 완료된 것을 확인하고 새로고침
        // window.location.reload();  // 페이지 새로 고침 (리렌더링)
        // 상태 저장이 완료된 것을 확인하고 리다이렉트
        window.location.replace('/home');  // navigate 대신 window.location.replace 사용
      } catch (err) {
        console.error('GitHub 인증 실패:', err);
        window.location.replace('/login');  // 에러 시에도 window.location.replace 사용
      } finally {
        setLoading(false);
      }
    };

    handleGithubAuth();
  }, []);

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
