import axiosInstance from '../axiosInstance';  // 기존의 axios 인스턴스를 사용

// GitHub 인증 code를 백엔드로 보내는 함수
const postAuthGithub = async (code) => {
  try {
    // 백엔드로 GitHub 인증 code 전송
    const response = await axiosInstance.post('/api/auth/github', { code });

    // 응답받은 데이터 (액세스 토큰, 리프레시 토큰 등) 반환
    return response.data;
  } catch (error) {
    throw new Error('GitHub 인증에 실패했습니다.');
  }
};

export default postAuthGithub;
