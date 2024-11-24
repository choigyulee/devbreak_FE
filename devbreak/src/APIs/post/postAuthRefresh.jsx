// 리프레시 토큰
import axiosInstance from "../axiosInstance";

export default async function postAuthLogout() {
  try {

    const response = await axiosInstance.post(
      `/api/auth/refresh`,
  )
  return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}


