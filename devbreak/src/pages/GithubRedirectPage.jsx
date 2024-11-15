import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import postAuthGithub from "../APIs/post/postAuthGithub";
import styled from "@emotion/styled";

const GithubRedirectPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const getCodeFromUrl = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    return params.get("code");
  };

  const fetchTokensFromBackend = async (code) => {
    try {
      const { accessToken, refreshToken, grantType, expiresIn } = await postAuthGithub(code);

      // 로컬 스토리지에 액세스 토큰 저장
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("grantType", grantType);
      sessionStorage.setItem("expiresIn", expiresIn);

      login();  // 로그인 상태로 설정
      navigate("/home");  // 홈 페이지로 리디렉션
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
