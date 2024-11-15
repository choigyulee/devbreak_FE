import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../AuthContext";

const GitHubCallback = () => {
  const { login } = useAuth(); // 로그인 상태 관리
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // GitHub에서 리디렉션된 URL에서 code 파라미터 추출

    if (code) {
      // code를 백엔드에 전달하여 액세스 토큰 요청
      axios.post('/api/auth/github', { authorizationCode: code })
        .then(response => {
          const { accessToken, refreshToken } = response.data;

          // 로그인 처리
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          login(); // 로그인 상태 업데이트
          
          // 로그인 후 원하는 페이지로 이동 (예: 대시보드)
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('GitHub 인증 실패:', error);
          // 에러 처리: 사용자에게 알림 표시 또는 로그인 페이지로 리다이렉트
          window.location.href = '/login';
        });
    }
  }, []);

  return <div>GitHub 로그인 중...</div>;
};

export default GitHubCallback;
