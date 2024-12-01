import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/react';
import CopywritingItem from "../components/StartPageItems/CopywritingItem";
import StartPageNavBar from "../components/StartPageNavBar";
import { useAuth } from "../context/AuthContext";
import GoToButton from "../components/GoToButton";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom"; 

function StartPage() {

  const { isLoggedIn } = useAuth(); 

  return (
    <>
      <StartPageNavBar isLoggedIn={isLoggedIn} />
      <Container>
        <TextContainer>
          <TitleBox>
            Hi there, welcome to <BoldText>devbreak</BoldText>!
          </TitleBox>
          <ComentBox>
            <Line>Turn your GitHub repos into real-time, collaborative tech blogs</Line>
            <Line>—capture and share every development insight.</Line>
          </ComentBox>
        </TextContainer>

        <CopywritingItem></CopywritingItem>

        <ButtonContainer>
          <Link to="/home">
        <GoToHome>Enter DevBreak<MovingIcon size={20} /></GoToHome>
        </Link>
        </ButtonContainer>

      </Container>
    </>
  );
}

export default StartPage;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15vh;
  gap: 8vh;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
`;

const TitleBox = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 2vw;
  line-height: 48px;
  color: white;
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 2vw;
  font-family: "Pretendard"; // devbreak에 대한 font-weight 설정
`;

const ComentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5vw;
  color: #ffffff;
`;

const moveDownUp = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${moveDownUp} 2s ease-in-out infinite;
`;

const GoToHome = styled.span`
  margin: 0 auto;
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 2vw;
  cursor: pointer;
  transition: color, border 0.3s;

  &:hover {
    color: #02f798;
    border-bottom: 1.5px solid #02f798;
  }

  animation: ${moveDownUp} 2s ease-in-out infinite;
  transition: transform 0.2s ease-in-out;
`;

// 이동하는 아이콘을 위한 스타일
const MovingIcon = styled(BsArrowRight)`
  margin-left: 10px;
`;