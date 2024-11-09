import styled from "@emotion/styled";
import BackToHomeBar from "../components/LoginPageItems/BackToHomeBar";
import DashBoardsItem from "../components/LoginPageItems/DashBoardsItem";

function LoginPage() {
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
