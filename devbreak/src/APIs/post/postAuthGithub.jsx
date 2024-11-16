// Github 소셜 로그인/회원가입
import axiosInstance from "../axiosInstance";

export default async function postAuthGithub(authorizationCode) {
  try {
    // GitHub 인증 코드 전달
    const response = await axiosInstance.post(
      `/api/auth/github`,
      { authorizationCode }  // authorizationCode 전달
    );

    // 응답 데이터가 존재하는지 확인
    const { accessToken, refreshToken, grantType, expiresIn } = response.data;
    if (!accessToken || !refreshToken) {
      throw new Error("토큰 데이터가 올바르지 않습니다.");
    }

    return {
      accessToken,
      refreshToken,
      grantType,
      expiresIn,
    };
  } catch (error) {
    if (error.response) {
      // 백엔드에서 반환한 에러 메시지 처리
      console.error("백엔드 에러:", error.response.data);
      throw new Error(error.response?.data?.message || "GitHub 인증 처리 실패");
    } else if (error.request) {
      // 요청은 했으나 응답을 받지 못한 경우
      console.error("서버 연결 실패:", error.request);
      throw new Error("서버 연결 실패");
    } else {
      // 그 외의 에러 처리
      console.error("에러 발생:", error.message);
      throw new Error("알 수 없는 오류");
    }
  }
}
