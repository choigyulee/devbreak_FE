import styled from "@emotion/styled";
import PropTypes from "prop-types"; // PropTypes import
import { FaHeart } from "react-icons/fa";

const LikesItem = ({ liked, likeCount, handleLikeClick }) => {
  return (
    <LikesContainer liked={liked}>
      <StyledFaHeart liked={liked} onClick={handleLikeClick} />
      <span>{likeCount}</span>
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
  margin: 5vh 5vh 2.5vh 5vh;
  gap: 1.5vh;

  span {
    font-size: 3vh;
    font-weight: 400;
    color: ${(props) => (props.liked ? "#FF4F4F" : "#a7a7a7")}; // 좋아요 상태에 따라 색상 변경
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
