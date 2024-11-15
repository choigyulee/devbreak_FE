// import styled from "@emotion/styled";
// import DashBoard from "./DashBoard"; // 이미 임포트된 DashBoard 사용
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate 임포트
// import { useAuth } from "../../AuthContext";

// const DashBoardsItem = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate(); // navigate 초기화
//   const { login } = useAuth(); // context에서 login 함수 가져오기

//   const handleImageClick = () => {
//     login(); // 로그인 상태 설정
//     navigate("/home"); // HomePage로 이동
//   };

//   return (
//     <ItemBox>
//       <DashBoard />
//       <HoverableDashBoard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//         <TextContainer>
//           <Line>
//             Go To <BoldText isHovered={isHovered}>Sign Up</BoldText>
//           </Line>
//           <Line>
//             and <BoldText isHovered={isHovered}>Join Us !</BoldText>
//           </Line>
//         </TextContainer>
//         <StyledImage src="/image/Github_Login.png" alt="GitHub Login" onClick={handleImageClick} />
//       </HoverableDashBoard>
//       <DashBoard />
//     </ItemBox>
//   );
// };

// export default DashBoardsItem;

// const ItemBox = styled.div`
//   display: flex; /* Flexbox를 사용하여 자식 요소를 수평으로 배치 */
//   flex-direction: row; /* 가로 방향으로 정렬 */
//   align-items: stretch; /* 자식 요소의 높이를 동일하게 맞춤 */
//   justify-content: center; /* 중앙 정렬 */
//   gap: 3vh; /* 자식 요소 간의 간격 */
//   margin: 0 -5vh; /* 양쪽 마진을 마이너스로 설정하여 잘린 듯한 효과 */
//   width: calc(100% + 10vh); /* 마진을 고려하여 전체 너비를 늘림 */
// `;

// const HoverableDashBoard = styled(DashBoard)`
//   position: relative; /* z-index와 transform을 사용하기 위해 position 설정 */
//   z-index: 1; /* 기본 z-index를 높게 설정 */
//   transition: transform 0.3s ease, font-size 0.3s ease, height 0.3s ease; /* 애니메이션 효과 */
//   display: flex; /* Flexbox를 사용하여 자식 요소를 정렬 */
//   flex-direction: column;
//   width: 40vw;
//   gap: 5vh;
//   justify-content: center; /* 수평 중앙 정렬 */
//   align-items: center; /* 수직 중앙 정렬 */

//   &:hover {
//     transform: scale(1.2); /* 크기 증가 */
//     font-size: 5.5vh; /* 폰트 크기 증가 */
//     border: 1px solid #71ffc9; /* hover 시 border 색상 변경 */
//     box-shadow: 0px 0px 10px #71ffc9; /* hover 시 box-shadow 추가 */
//   }
// `;

// const TextContainer = styled.div`
//   text-align: center; /* 텍스트를 가운데 정렬 */
//   gap: 10vh;
// `;

// const Line = styled.div`
//   font-family: "Pretendard";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 5vh;
//   color: white;
//   transition: font-size 0.3s ease; /* 글자 크기 전환 효과 */
// `;

// const BoldText = styled.span`
//   font-weight: 700;
//   font-size: 5.5vh;
//   font-family: "Pretendard"; // devbreak에 대한 font-weight 설정
//   color: ${({ isHovered }) => (isHovered ? "#02f798" : "inherit")}; /* hover 시 색상 변경 */
//   transition: color 0.2s ease; /* 색상 변경에 대한 트랜지션 추가 */
// `;

// const StyledImage = styled.img`
//   width: 100%; /* 이미지의 너비를 부모 요소에 맞춤 */
//   max-width: 25vh; /* 최대 너비를 설정하여 크기 제한 */
//   height: auto; /* 비율을 유지하면서 높이 자동 조정 */
//   margin-top: 1vh;
//   cursor: pointer; /* 이미지와 텍스트 간의 간격 조정 */
// `;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../AuthContext"; // 로그인 상태를 관리하는 context
import postAuthGithub from "../../APIs/post/postAuthGithub";
import styled from "@emotion/styled";
import DashBoard from './DashBoard';

// DashBoardsItem 컴포넌트
const DashBoardsItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 상태를 관리하는 context

  // GitHub 로그인 버튼 클릭 시 처리
  const handleGitHubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;  // .env 파일에서 가져온 Client ID
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;  // .env 파일에서 가져온 리디렉트 URI

    const state = Math.random().toString(36).substring(7);  // CSRF 방지를 위한 랜덤 값

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=user`;

    // GitHub 로그인 페이지로 리디렉션
    window.location.href = githubAuthUrl;
  };

  // GitHub 인증 성공 후 처리
  const handleGitHubSuccess = async (authorizationCode) => {
    try {
      const { accessToken, refreshToken, grantType, expiresIn } = await postAuthGithub(authorizationCode); // GitHub 인증 후 토큰 받기

      // 액세스 토큰과 리프레시 토큰을 세션에 저장
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // 로그인 처리 (예: 사용자 정보를 로그인 상태로 저장)
      login(); // 로그인 상태 설정
      navigate("/home"); // 홈으로 이동
    } catch (error) {
      console.error("GitHub OAuth Failed:", error);
      // 오류 처리: 인증 실패 시 사용자에게 알림 표시 등을 할 수 있습니다.
    }
  };

  // GitHub 인증 실패 처리
  const handleGitHubFailure = (error) => {
    console.error("GitHub OAuth Failed:", error);
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
        {/* GitHub 로그인 이미지를 클릭하면 GitHub 인증 페이지로 리디렉션 */}
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
