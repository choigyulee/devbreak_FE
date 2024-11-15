// Github 소셜 로그인/회원가입
import axiosInstance from '../axiosInstance';

export default async function postAuthGithub(authorizationCode) {
  try {
    const response = await axiosInstance.post('/api/auth/github', {
      authorizationCode,
    });

    const { accessToken, refreshToken } = response.data;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('GitHub 인증 실패:', error);
    throw new Error('GitHub 인증 처리 중 오류가 발생했습니다.');
  }
}
