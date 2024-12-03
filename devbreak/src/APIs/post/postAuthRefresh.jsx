// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";

export default async function postAuthRefresh() {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');  // 세션 스토리지에서 리프레시 토큰 가져오기
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // 리프레시 토큰을 서버로 보내서 새로운 액세스 토큰을 받아옴
    const response = await axiosInstance.post('/api/auth/refresh', { refreshToken });

    if (response.data.accessToken) {
      return response.data.accessToken;  // 서버에서 받은 액세스 토큰을 반환
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;  // 에러를 다시 던져서 호출한 곳에서 처리하도록 함
  }
}

