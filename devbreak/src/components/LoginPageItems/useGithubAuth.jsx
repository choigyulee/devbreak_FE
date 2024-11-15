import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGithubAuth = () => {
  const navigate = useNavigate();

  const initiateGithubLogin = useCallback(() => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const state = Math.random().toString(36).substring(7);
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    
    window.location.href = authUrl;
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
      
      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('grantType', data.grantType);
      localStorage.setItem('expiresIn', data.expiresIn);

      navigate('/home');
      return true;
    } catch (error) {
      console.error('GitHub authentication error:', error);
      navigate('/login?error=auth_failed');
      return false;
    }
  }, [navigate]);

  return {
    initiateGithubLogin,
    handleAuthCallback,
  };
};