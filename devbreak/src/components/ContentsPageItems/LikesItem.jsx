import { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types"; // PropTypes import
import { FaHeart } from "react-icons/fa";

const LikesItem = ({ liked, likeCount, handleLikeClick }) => {
  const [isHovered, setIsHovered] = useState(false); // 호버 상태 관리

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <LikesContainer liked={liked}>
      <StyledFaHeart
        liked={liked}
        onClick={handleLikeClick}
        onMouseEnter={handleMouseEnter} // 하트에 마우스를 올리면 상태 업데이트
        onMouseLeave={handleMouseLeave} // 하트에서 마우스를 떼면 상태 업데이트
      />
      <StyledSpan liked={liked}>{likeCount}</StyledSpan> {/* span에 스타일 추가 */}
      {isHovered && <Comment>If you liked this breakthrough, please give it a heart!</Comment>}{" "}
      {/* 호버 상태일 때 코멘트 표시 */}
    </LikesContainer>
  );
};

// PropTypes 정의
LikesItem.propTypes = {
  liked: PropTypes.bool.isRequired, // liked는 boolean이며 필수
  likeCount: PropTypes.number.isRequired, // likeCount는 숫자이며 필수
  handleLikeClick: PropTypes.func.isRequired, // handleLikeClick은 함수이며 필수
};

const LikesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10vh 5vh 2.5vh 2vh;
  gap: 1.5vh;
  position: relative; /* 이 부분 추가 */
`;

const StyledSpan = styled.span`
  font-size: 2.5vh;
  color: ${(props) => (props.liked ? "#FF4F4F" : "#a7a7a7")}; /* liked 상태에 따라 색상 변경 */

  &:active {
    color: #ff6060;
  }
`;

const Comment = styled.p`
  font-size: 2.5vh;
  font-weight: 400;
  font-family: "Pretendard";
  color: #a7a7a7;
  margin-top: 1vh;
  position: absolute;
  top: -8.7vh; /* 하트 아이콘 바로 위에 위치 */
  left: 13.7vw;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: #333333;
  padding: 1vh 2vh;
  border-radius: 5px;
  z-index: 10;
  transition: opacity 0.3s ease, transform 1s ease; /* 자연스러운 transition 추가 */

  /* 말풍선 삼각형 */
  &::after {
    content: "";
    position: absolute;
    bottom: -1.5vh;
    left: 10%;
    transform: translateX(-50%);
    border-left: 1.5vh solid transparent;
    border-right: 1.5vh solid transparent;
    border-top: 1.5vh solid #333333;
  }
`;

const StyledFaHeart = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#FF4F4F" : "#a7a7a7")};
  font-size: 3vh;
  cursor: pointer;

  &:hover {
    color: #ff6060;
  }
  &:active {
    color: #ff6060;
  }
`;

export default LikesItem;
