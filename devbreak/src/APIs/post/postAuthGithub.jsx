import axiosInstance from "../axiosInstance";

export default async function postAuthGithub(authorizationCode) {
  try {
    // GitHub 인증 코드와 함께 요청 보내기 (authorizationCode를 request body에 포함)
    const response = await axiosInstance.post(`/api/auth/github`, {
      authorizationCode: authorizationCode // request body에 authorizationCode 포함
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
