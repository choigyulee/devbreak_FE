import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // 로그인 상태를 관리하는 context
import styled from "@emotion/styled";
import DashBoard from './DashBoard';

// DashBoardsItem 컴포넌트
const DashBoardsItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 상태를 관리하는 context

  const handleGitHubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_GITHUB_REDIRECT_URI);
    
    // GitHub OAuth 로그인 URL 생성
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    
    // GitHub 로그인 페이지로 리디렉션
    window.location.href = githubAuthUrl;
  };
  


  return (
    <ItemBox>
      <DashBoard />
      <HoverableDashBoard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleGitHubLogin}>
        <TextContainer>
          <Line>
            Go To <BoldText isHovered={isHovered}>Sign Up</BoldText>
          </Line>
          <Line>
            and <BoldText isHovered={isHovered}>Join Us!</BoldText>
          </Line>
        </TextContainer>
        <StyledImage src="/image/Github_Login.png" alt="GitHub Login" />
      </HoverableDashBoard>
      <DashBoard />
    </ItemBox>
  );
};

export default DashBoardsItem;

// Styled components
const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 3vh;
  margin: 0 -5vh;
  width: calc(100% + 10vh);
`;

const HoverableDashBoard = styled(DashBoard)`
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, font-size 0.3s ease, height 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 40vw;
  gap: 5vh;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.2);
    font-size: 5.5vh;
    border: 1px solid #71ffc9;
    box-shadow: 0px 0px 10px #71ffc9;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  gap: 10vh;
`;

const Line = styled.div`
  font-family: "Pretendard";
  font-size: 5vh;
  color: white;
  transition: font-size 0.3s ease;
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 5.5vh;
  color: ${({ isHovered }) => (isHovered ? "#02f798" : "inherit")};
  transition: color 0.2s ease;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 25vh;
  height: auto;
  margin-top: 1vh;
  cursor: pointer;
`;
