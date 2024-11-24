// src/APIs/get/getAuthGithub.js
import axiosInstance from "../axiosInstance";

export default async function getAuthGithub() {
  try {
    // URL에서 인증 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (!code) {
      throw new Error("인증 코드가 없습니다.");
    }

    // 인증 코드를 백엔드로 전달
    const response = await axiosInstance.get(`/api/auth/github`, {
      params: { code }
    });

    const { accessToken, refreshToken } = response.data;
    
    if (!accessToken || !refreshToken) {
      throw new Error("토큰 데이터가 올바르지 않습니다.");
    }
    
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw error;
  }
}