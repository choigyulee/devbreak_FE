import styled from "@emotion/styled";
import BackToHomeBar from "../components/LoginPageItems/BackToHomeBar";
import DashBoardsItem from "../components/LoginPageItems/DashBoardsItem";

function LoginPage() {

  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;

  return (
    <>
      <BackToHomeBar />
      <Container>
        <DashBoardsItem />
        <a href={githubLoginUrl}>GitHub로 로그인</a>
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
