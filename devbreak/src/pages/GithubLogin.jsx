import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";
import postAuthGithub from "../APIs/post/postAuthGithub";

const GithubLogin = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // isLoggedIn 추가
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  };

  const saveCookies = (tokens) => {
    const { accessToken, refreshToken, grantType, expiresIn } = tokens;
    const cookieOptions = {
      expires: 7,
      path: "/",
      secure: window.location.protocol === 'https:',
      sameSite: "Lax",
    };

    Cookies.set("accessToken", accessToken, cookieOptions);
    Cookies.set("refreshToken", refreshToken, cookieOptions);
    Cookies.set("grantType", grantType, cookieOptions);
    Cookies.set("expiresIn", expiresIn, cookieOptions);
    localStorage.setItem('accessToken', `Bearer ${accessToken}`);
  };

  const fetchTokensFromBackend = async (code) => {
    try {
      setIsLoading(true);
      const response = await postAuthGithub(code);
      
      saveCookies(response);
      await login(); // login 함수가 비동기일 경우를 대비
      
      const redirectTo = location.state?.from || "/home"; // 이전에 시도한 페이지가 있으면 그곳으로 리디렉션
      navigate(redirectTo);
    } catch (error) {
      console.error("GitHub 인증 실패:", error);
      setError(error.message);
      setTimeout(() => navigate("/login"), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const code = getCodeFromUrl();
    
    if (!code) {
      setError("인증 코드를 찾을 수 없습니다.");
      setIsLoading(false);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    fetchTokensFromBackend(code);
  }, [navigate, location.state?.from]);

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          {error}
          <RedirectText>5초 후 로그인 페이지로 이동합니다...</RedirectText>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading && (
        <>
          <LoadingSpinner />
          <h2>GitHub 인증 중...</h2>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  font-size: 2rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 1.5rem;
  margin: 20px;
`;

const RedirectText = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  margin-top: 10px;
`;

export default GithubLogin;