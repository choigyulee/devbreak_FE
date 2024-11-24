import axiosInstance from "../axiosInstance";

export default async function getAuthGithub() {
  try {
    // URL에서 code 파라미터를 가져옵니다. GitHub 인증 후 리디렉션되는 URL에서 code가 전달됩니다.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // GitHub 인증 코드

    if (!code) {
      throw new Error('GitHub 인증 코드가 없습니다.');
    }

    // 인증 코드로 서버에 요청하여 accessToken과 refreshToken을 받아옵니다.
    const response = await axiosInstance.post(`/api/auth/github`, { code });

    const { accessToken, refreshToken } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error("토큰 데이터가 올바르지 않습니다.");
    }

    // 세션 스토리지에 토큰 저장
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("GitHub 인증 실패:", error);
    throw new Error(error.message || "GitHub 인증 처리 실패");
  }
}
