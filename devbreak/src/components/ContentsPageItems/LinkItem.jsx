import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const LinkItem = ({ blogName, blogId }) => (
  <Container>
    <span className="comment">If you are curious about which blog this article is from,</span>
    <span className="button">
      {blogName}
      <Link to={`/blog/${blogId}`}>
        <Button>Go To See</Button>
      </Link>
    </span>
  </Container>
);

LinkItem.propTypes = {
  blogName: PropTypes.string.isRequired, // blogName은 문자열이며 필수
  blogId: PropTypes.number.isRequired, // blogId는 숫자이며 필수
};

export default LinkItem;

const Container = styled.div`
  border: 1px solid #02f798;
  border-radius: 3vh;
  padding: 4vh 5vh;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  backdrop-filter: blur(40px);
  .comment {
    font-size: 3vh;
    color: #c9c9c9;
    font-family: "pretendard";
    font-weight: 400;
  }
  .button {
    font-size: 5vh;
    font-family: "pretendard";
    font-weight: 700;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2vh 0 1vh 0;
  }
`;

const Button = styled.button`
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 2vh 3vh;
  font-size: 3vh;
  font-family: "pretendard";
  font-weight: 700;
  border-radius: 2vh;
  cursor: pointer;
  backdrop-filter: blur(40px);
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 5px #02f798;
  }
`;
