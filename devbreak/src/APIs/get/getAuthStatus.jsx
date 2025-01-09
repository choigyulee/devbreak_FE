// 토큰 유효성 검사
import axiosInstance from "../axiosInstance";


export default async function getAuthStatus() {
  try {
    const response = await axiosInstance.get(`/api/auth/status`,
      {
        withCredentials: true
      }
    )
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    if (error.response && error.response.status === 401) {
      return { loggedIn: false, message: "Access token is missing" };
    }
    throw error;
  }
}

