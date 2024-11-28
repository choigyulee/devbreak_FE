import styled from "@emotion/styled";
import PropTypes from "prop-types"; // PropTypes import
import { BsStarFill } from "react-icons/bs";

const StarItem = ({ followed, handleFollowClick }) => {
  return (
    <FollowContainer followed={followed}>
      <StyledBsStarFill followed={followed} onClick={handleFollowClick} />
    </FollowContainer>
  );
};

// PropTypes 정의
StarItem.propTypes = {
  followed: PropTypes.bool.isRequired, // liked는 boolean이며 필수
  handleFollowClick: PropTypes.func.isRequired, // handleLikeClick은 함수이며 필수
};

const FollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-size: 3vh;
    font-weight: 400;
    color: ${(props) => (props.followed ? "#FFEC4C" : "#a7a7a7")}; // 좋아요 상태에 따라 색상 변경
  }
`;

const StyledBsStarFill = styled(BsStarFill)`
  color: ${(props) => (props.followed ? "#FFEC4C" : "#a7a7a7")};
  font-size: 3vh;
  cursor: pointer;

  &:hover {
    color: #FFEC4C;
  }
  &:active {
    color: #FFEC4C;
  }
`;

export default StarItem;
