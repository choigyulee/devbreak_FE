import axiosInstance from "../axiosInstance";
import Cookies from 'js-cookie';

export default async function getAuthGithub() {
  try {
    console.log("GitHub 인증 서버로 요청을 보내는 중...");
    
    // 백엔드에서 GitHub 인증 후 액세스 토큰을 받아오는 요청
    const response = await axiosInstance.get(`/api/auth/github`);

    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error("토큰 데이터가 올바르지 않습니다.");
    }

    // 액세스 토큰과 리프레시 토큰을 쿠키에 저장
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw new Error(error.message || "GitHub 인증 처리 실패");
  }
}
