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
      params: { code },
      withCredentials: true, 
    });

    if (response.status === 200) {
      // 서버에서 쿠키가 자동으로 처리되므로 클라이언트는 쿠키를 직접 저장할 필요 없음
      console.log("GitHub 인증 성공");
    } else {
      throw new Error("GitHub 인증 실패");
    }
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw error;
  }
}