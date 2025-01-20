// 리프레시 토큰을 사용하여 액세스 토큰 갱신
import axiosInstance from "../axiosInstance";

export default async function postAuthRefresh() {

  try {
    console.log('토큰 재발급 요청 중');
    const response = await axiosInstance.post('/api/auth/refresh',
      { 
        withCredentials: true
      }
    );

    if (response.status === 200) {
      console.log('새로운 액세스 토큰이 HttpOnly 쿠키로 설정되었습니다.');
    } else {
      console.error('토큰 갱신 실패:', response.data);
      throw new Error('토큰 갱신 실패');
    }
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error.response?.data || error.message);
    throw error;
  }
}

