import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGithubAuth = () => {
  const navigate = useNavigate();

  const initiateGithubLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const state = Math.random().toString(36).substring(7);  // CSRF 보호용 state

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = authUrl;  // GitHub 로그인 페이지로 리디렉션
  }, []);

  const handleAuthCallback = useCallback(async (code) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorizationCode: code }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      // 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      sessionStorage.setItem('grantType', data.grantType);
      sessionStorage.setItem('expiresIn', data.expiresIn);

      navigate('/home');
      return true;
    } catch (error) {
      console.error('GitHub 인증 오류:', error);
      navigate('/login?error=auth_failed');
      return false;
    }
  }, [navigate]);

  return {
    initiateGithubLogin,
    handleAuthCallback,
  };
};
