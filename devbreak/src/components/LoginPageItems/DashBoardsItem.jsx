import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import DashBoard from './DashBoard';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const DashBoardsItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGitHubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    // 현재 경로를 쿠키에 저장 (리디렉션용)
    const currentPath = window.location.pathname;
    Cookies.set('loginRedirectPath', currentPath, { expires: 7, path: '/home' });

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    window.location.href = githubAuthUrl;
  };

  // 로그인 성공 시 쿠키에 로그인 상태 저장
  const handleLoginSuccess = (accessToken, refreshToken) => {
    login(accessToken, refreshToken); // 로그인 처리

    // 쿠키에서 리디렉션 경로 가져오기
    const redirectPath = Cookies.get('loginRedirectPath') || '/home';

    // 로그인 후 해당 경로로 리디렉션
    navigate(redirectPath);
  };

  return (
    <ItemBox>
      <DashBoard />
      <HoverableDashBoard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleGitHubLogin}
      >
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
