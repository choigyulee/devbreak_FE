// 로그아웃
// Github 소셜 로그인/회원가입
import axiosInstance from "../axiosInstance";

export default async function postAuthGithub() {
  try {

    const response = await axiosInstance.post(
      `/api/auth/logout`,
  )
  return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error;
  }
}


