import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import

const BreakthroughBox = ({ title, createdAt, blogName, articleId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate(`/breakthrough/${articleId}`); // 클릭 시 이동할 경로
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} // 클릭 이벤트 핸들러 추가
    >
      <Title>{title}</Title>
      <Content isHovered={isHovered}>
        {createdAt}/{blogName}
      </Content>
    </Box>
  );
};

const Box = styled.div`
  box-sizing: border-box;
  display: flex; /* Flexbox를 사용하여 자식 요소 정렬 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  padding: 2.8vh 3vh;
  width: 20vw;
  height: 15vh;
  justify-content: space-between;
  gap: 2vh;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  border-radius: 2vh;
  color: white; /* 제목 색상 */
  transition: transform 0.3s ease; /* 호버 시 애니메이션 효과 */

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 15px rgba(2, 247, 152, 0.25);
  }
`;

const Title = styled.h3`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 700; /* 두꺼운 글씨 */
  font-size: 2.3vh; /* 제목 크기 */
  text-align: left;
  margin: 0; /* 기본 마진 제거 */
  /* 두 줄로 제한하고 넘치는 내용은 ⋯로 표시 */
  display: -webkit-box; /* Flexbox를 사용하여 줄 수 제한 */
  -webkit-box-orient: vertical; /* 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  text-overflow: ellipsis; /* 넘치는 내용에 ⋯ 표시 */
`;

const Content = styled.p`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 400; /* 일반 글씨 */
  font-size: 1.8vh; /* 내용 크기 */
  color: ${({ isHovered }) => (isHovered ? "#02f798" : "#c9c9c9")}; /* 호버 시 색상 변경 */
  text-align: left; /* 내용 왼쪽 정렬 */
  margin: 0; /* 기본 마진 제거 */
  /* 두 줄로 제한하고 넘치는 내용은 ⋯로 표시 */
  display: -webkit-box; /* Flexbox를 사용하여 줄 수 제한 */
  -webkit-box-orient: vertical; /* 세로 방향으로 정렬 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  text-overflow: ellipsis; /* 넘치는 내용에 ⋯ 표시 */
`;

// PropTypes를 사용하여 props의 타입을 검증
BreakthroughBox.propTypes = {
  title: PropTypes.string.isRequired, // title은 필수 문자열
  createdAt: PropTypes.string.isRequired, // createdAt은 필수 문자열
  blogName: PropTypes.string.isRequired, // blogName은 필수 문자열
  articleId: PropTypes.number.isRequired, // articleId는 필수 숫자
};

export default BreakthroughBox;
