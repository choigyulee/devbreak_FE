import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom"; // Link 컴포넌트 import

const OfficialBlogBox = ({ blogId, blogName, description }) => {
  return (
    <Link to={`/blog/${blogId}`} style={{ textDecoration: "none" }}>
      <Box>
        <BlogName>{blogName}</BlogName>
        <Content>{description}</Content>
      </Box>
    </Link>
  );
};

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  width: 25vw;
  padding: 2vh;
  margin: 10px 0;
  transition: transform 0.3s ease; /* 호버 시 애니메이션 효과 */

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 15px rgba(2, 247, 152, 0.25);
  }

  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  width: 25vw;
  padding: 2vh;
`;

const BlogName = styled.h3`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 700; /* 두꺼운 글씨 */
  font-size: 2.5vh; /* 제목 크기 */
  text-align: left;
  margin: 0 0 10px 0; /* 기본 마진 제거 */
`;

const Content = styled.p`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 400; /* 일반 글씨 */
  font-size: 2vh; /* 내용 크기 */
  text-align: left; /* 내용 왼쪽 정렬 */
  margin: 0; /* 기본 마진 제거 */
`;

// PropTypes를 사용하여 props의 타입을 검증
OfficialBlogBox.propTypes = {
  blogId: PropTypes.number.isRequired, // blogId는 필수 숫자
  blogName: PropTypes.string.isRequired, // title은 필수 문자열
  description: PropTypes.string.isRequired, // contents는 필수 문자열
};

export default OfficialBlogBox;
