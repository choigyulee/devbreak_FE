import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // 로그인 상태 관리 함수
import Cookies from "js-cookie"; // js-cookie 사용
import axios from "axios"; // axios 라이브러리 사용

const GithubLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 상태 관리 함수

  // URL에서 'code' 파라미터를 추출하는 함수
  const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search); // 현재 URL의 쿼리 문자열을 가져옴
    return params.get("code"); // 'code' 파라미터의 값을 반환
  };

  // 백엔드에 `code`를 보내고 액세스 토큰을 받아오는 함수
  const fetchTokensFromBackend = async (code) => {
    try {
      // 백엔드로 POST 요청을 보내서 액세스 토큰을 가져옴
      const response = await axios.post("/api/auth/github", { code });

      // 응답에서 액세스 토큰과 리프레시 토큰을 추출
      const { accessToken, refreshToken, grantType, expiresIn } = response.data;

      // 쿠키에 토큰 저장
      Cookies.set("accessToken", accessToken, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
      Cookies.set("grantType", grantType, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
      Cookies.set("expiresIn", expiresIn, { expires: 7, path: "/", secure: true, sameSite: "Strict" });

      // 로그인 상태로 설정
      login();

      // 홈으로 리디렉션
      navigate("/home");
    } catch (error) {
      console.error("GitHub 인증 실패:", error);
      alert("GitHub 인증에 실패했습니다.");
    }
  };

  useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      console.log(code); // 여기서 코드 확인
      fetchTokensFromBackend(code); // 백엔드에 `code` 보내기
    } else {
      alert("GitHub 인증에 실패했습니다.");
    }
  }, []); // 빈 배열을 넣으면 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <Container>
      <h2>GitHub 인증 중...</h2>
    </Container>
  );
};

export default GithubLogin;

const Container = styled.div`
  text-align: center;
  margin-top: 20vh;
  font-size: 2rem;
`;
