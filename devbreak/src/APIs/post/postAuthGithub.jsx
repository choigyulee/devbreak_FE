// Github 소셜 로그인/회원가입
import axiosInstance from "../axiosInstance";

export default async function postAuthGithub(authorizationCode) {
  try {
    // GitHub 인증 코드와 함께 요청 보내기
    const response = await axiosInstance.post("/api/auth/github", {
      authorizationCode: authorizationCode,
    });

    // 서버에서 받은 accessToken과 refreshToken 반환
    const { accessToken, refreshToken, grantType, expiresIn } = response.data;

    // 성공적인 응답 처리 후, 토큰 정보를 반환
    return {
      accessToken,
      refreshToken,
      grantType,
      expiresIn,
    };
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw error; // 에러를 상위로 전달
  }
}
