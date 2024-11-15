import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 훅 추가
import { useAuth } from "../AuthContext";
import postAuthGithub from "../APIs/post/postAuthGithub";
import styled from "@emotion/styled";

const GithubRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // 로그인 상태 관리 함수 가져오기

  // URL에서 `code`를 추출하는 함수
  const getCodeFromUrl = () => {
    const location = useLocation();  // useLocation 훅을 사용하여 현재 위치 (URL) 정보를 가져옵니다.
    const params = new URLSearchParams(location.search); // URLSearchParams로 쿼리 파라미터를 파싱
    return params.get("code"); // "code" 파라미터 값 추출
  };

  // 백엔드에 `code`를 보내고 액세스 토큰을 받아오는 함수
  const fetchTokensFromBackend = async (code) => {
    try {
      const { accessToken, refreshToken, grantType, expiresIn } = await postAuthGithub(code);

      // 로컬 스토리지에 액세스 토큰과 리프레시 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("grantType", grantType);
      localStorage.setItem("expiresIn", expiresIn);

      // 로그인 상태로 설정
      login();

      // 홈 페이지로 리디렉션
      navigate("/home");
    } catch (error) {
      console.error("GitHub 인증 실패:", error);
      alert("GitHub 인증에 실패했습니다.");
    }
  };

  useEffect(() => {
    const code = getCodeFromUrl();  // URL에서 code를 추출
    if (code) {
      fetchTokensFromBackend(code);  // 백엔드로 code를 보내서 토큰을 받아옴
    } else {
      alert("GitHub 인증에 실패했습니다.");
    }
  }, []); // 코드 변경 시마다 실행되지 않도록 빈 배열([])을 넣음

  return (
    <Container>
      <h2>GitHub 인증 중...</h2>
    </Container>
  );
};

export default GithubRedirectPage;

const Container = styled.div``;
