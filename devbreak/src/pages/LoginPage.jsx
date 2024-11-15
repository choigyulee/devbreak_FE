import React, { useEffect } from 'react';
import styled from "@emotion/styled";
import BackToHomeBar from "../components/LoginPageItems/BackToHomeBar";
import DashBoardsItem from "../components/LoginPageItems/DashBoardsItem";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import postAuthGithub from '../APIs/post/postAuthGithub';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get('code'); // GitHub에서 전달된 코드

    if (authorizationCode) {
      handleGithubAuth(authorizationCode);
    }
  }, []);

  const handleGithubAuth = async (authorizationCode) => {
    try {
      const { accessToken, refreshToken } = await postAuthGithub(authorizationCode);
      login(accessToken, refreshToken); // 로그인 상태로 전환
      navigate('/home'); // 홈 페이지로 이동
    } catch (error) {
      console.error(error);
      // 인증 실패 시 처리
    }
  };

  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}&scope=user`;


  return (
    <>
      <BackToHomeBar></BackToHomeBar>
      <Container>
        <DashBoardsItem></DashBoardsItem>
      </Container>
    </>
  );
}
export default LoginPage;

const Container = styled.div`
  margin: 10vh 0vh;
  display: flex;
  flex-direction: row;
  gap: 1vh;
  justify-content: space-between;
`;

