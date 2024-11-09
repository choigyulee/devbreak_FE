import styled from "@emotion/styled";
import { BsHeart } from "react-icons/bs"; // BsHeart 아이콘 import
import { useState } from "react"; // 상태 관리를 위해 useState import

const MyBreakthroughList = () => {
  const [isHovered, setIsHovered] = useState(false); // hover 상태 관리

  return (
    <DashBoard
      onMouseEnter={() => setIsHovered(true)} // hover 시작
      onMouseLeave={() => setIsHovered(false)} // hover 종료
    >
      <Title>
        <Line>
          <BoldText>Breakthrough</BoldText> list
        </Line>
        <Line>
          what you <BoldText>liked</BoldText>
        </Line>
      </Title>
      <IconContainer>
        <BsHeart size="15vh" color={isHovered ? "#FF6060" : "#ffffff"} /> {/* hover 시 아이콘 색상 변경 */}
      </IconContainer>
    </DashBoard>
  );
};

export default MyBreakthroughList;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: row;
  gap: 1vh;
  font-weight: 300; /* 일반 글씨 */
  font-size: 4vh; /* 제목 크기 */
  text-align: left;
  margin: 0;
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 4vh;
  font-family: "Pretendard"; /* 폰트 설정 */
`;

const DashBoard = styled.div`
  margin-left: 3vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6vh 5vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  border-radius: 4vh;
  color: white;
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 15px rgba(2, 247, 152, 0.25);
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2vh; /* 제목과 아이콘 사이의 간격 */
`;
