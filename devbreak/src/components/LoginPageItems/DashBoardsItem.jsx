import styled from "@emotion/styled";
import DashBoard from "./DashBoard"; // 이미 임포트된 DashBoard 사용
import { useState } from "react";

const DashBoardsItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ItemBox>
      <DashBoard />
      <HoverableDashBoard onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <TextContainer>
          <Line>
            Go To <BoldText isHovered={isHovered}>Sign Up</BoldText>
          </Line>
          <Line>
            and <BoldText isHovered={isHovered}>Join Us !</BoldText>
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
  display: flex; /* Flexbox를 사용하여 자식 요소를 수평으로 배치 */
  flex-direction: row; /* 가로 방향으로 정렬 */
  align-items: stretch; /* 자식 요소의 높이를 동일하게 맞춤 */
  justify-content: center; /* 중앙 정렬 */
  gap: 3vh; /* 자식 요소 간의 간격 */
  margin: 0 -5vh; /* 양쪽 마진을 마이너스로 설정하여 잘린 듯한 효과 */
  width: calc(100% + 10vh); /* 마진을 고려하여 전체 너비를 늘림 */
`;

const HoverableDashBoard = styled(DashBoard)`
  position: relative; /* z-index와 transform을 사용하기 위해 position 설정 */
  z-index: 1; /* 기본 z-index를 높게 설정 */
  transition: transform 0.3s ease, font-size 0.3s ease, height 0.3s ease; /* 애니메이션 효과 */
  display: flex; /* Flexbox를 사용하여 자식 요소를 정렬 */
  flex-direction: column;
  width: 40vw;
  gap: 5vh;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */

  &:hover {
    transform: scale(1.2); /* 크기 증가 */
    font-size: 5.5vh; /* 폰트 크기 증가 */
    border: 1px solid #71ffc9; /* hover 시 border 색상 변경 */
    box-shadow: 0px 0px 10px #71ffc9; /* hover 시 box-shadow 추가 */
  }
`;

const TextContainer = styled.div`
  text-align: center; /* 텍스트를 가운데 정렬 */
  gap: 10vh;
`;

const Line = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 300;
  font-size: 5vh;
  color: white;
  transition: font-size 0.3s ease; /* 글자 크기 전환 효과 */
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 5.5vh;
  font-family: "Pretendard"; // devbreak에 대한 font-weight 설정
  color: ${({ isHovered }) => (isHovered ? "#02f798" : "inherit")}; /* hover 시 색상 변경 */
  transition: color 0.2s ease; /* 색상 변경에 대한 트랜지션 추가 */
`;

const StyledImage = styled.img`
  width: 100%; /* 이미지의 너비를 부모 요소에 맞춤 */
  max-width: 25vh; /* 최대 너비를 설정하여 크기 제한 */
  height: auto; /* 비율을 유지하면서 높이 자동 조정 */
  margin-top: 1vh; /* 이미지와 텍스트 간의 간격 조정 */
`;
