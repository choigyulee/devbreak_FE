import styled from "@emotion/styled";
import BackToHomeBar from "../components/LoginPageItems/BackToHomeBar";
import DashBoardsItem from "../components/LoginPageItems/DashBoardsItem";
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const cookies = new Cookies();
  const navigate = useNavigate();

  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;

  useEffect(() => {
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    if (accessToken || refreshToken) {
        console.log('Tokens found. Redirecting to /main...');
        navigate('/main'); // 토큰이 있으면 메인 페이지로 리다이렉트
    }
}, [cookies, navigate]);

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
