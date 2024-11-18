import axiosInstance from "../axiosInstance";
import Cookies from 'js-cookie';

export default async function getAuthGithub() {
  try {
    const response = await axiosInstance.get(`/api/auth/github`);
    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error("토큰 데이터가 올바르지 않습니다.");
    }

    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw new Error(error.message || "GitHub 인증 처리 실패");
  }
}
