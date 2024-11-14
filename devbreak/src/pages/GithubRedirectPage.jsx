import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import postAuthGithub from "../APIs/post/postAuthGithub";

const GithubRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // 로그인 상태 관리 함수 가져오기

  // URL에서 `code`를 추출하는 함수
  const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
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
    const code = getCodeFromUrl();
    if (code) {
      fetchTokensFromBackend(code);
    } else {
      alert("GitHub 인증에 실패했습니다.");
    }
  }, []);

  return (
    <Container>
      <h2>GitHub 인증 중...</h2>
    </Container>
  );
};

export default GithubRedirectPage;

const Container = styled.div``;