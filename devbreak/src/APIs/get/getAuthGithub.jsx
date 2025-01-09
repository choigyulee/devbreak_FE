// src/APIs/get/getAuthGithub.js
import axiosInstance from "../axiosInstance";
import { useCookies } from 'react-cookie';

export default async function getAuthGithub() {
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

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
      // 서버에서 액세스 토큰과 리프레시 토큰을 받았으면 쿠키에 저장
      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        // 쿠키에 저장 (만약 서버가 자동으로 처리하지 않는 경우)
        setCookie("accessToken", access_token, { path: "/" });
        setCookie("refreshToken", refresh_token, { path: "/" });

        console.log("GitHub 인증 성공: 토큰이 쿠키에 저장되었습니다.");
      } else {
        throw new Error("토큰이 응답에 포함되지 않았습니다.");
      }
    } else {
      throw new Error("GitHub 인증 실패");
    }
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw error;
  }
}