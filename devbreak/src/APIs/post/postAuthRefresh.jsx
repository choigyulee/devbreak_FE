// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";

export default async function postAuthRefresh() {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');  // 세션 스토리지에서 리프레시 토큰 가져오기
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    console.log('Sending refresh token to server:', refreshToken);  // 리프레시 토큰 확인

    // 리프레시 토큰을 서버로 보내서 새로운 액세스 토큰을 받아옴
    const response = await axiosInstance.post('/api/auth/refresh', {
      refreshToken: refreshToken,
    });

    console.log('Refresh token response:', response);  // 서버 응답 확인

    if (response.data.accessToken) {
      console.log('Received new access token:', response.data.accessToken);  // 새로운 액세스 토큰 확인
      return response.data.accessToken;
    } else {
      console.error('Failed to refresh access token');
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);  // 리프레시 토큰 갱신 에러 로그
    throw error;  // 에러를 다시 던져서 호출한 곳에서 처리하도록 함
  }
}
