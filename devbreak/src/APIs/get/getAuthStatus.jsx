// 토큰 유효성 검사
import axiosInstance from "../axiosInstance";


export default async function getAuthStatus() {
  try {
    const response = await axiosInstance.get(`/api/auth/status`,
      {
        withCredentials: true
      }
    )
    return response;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
}

