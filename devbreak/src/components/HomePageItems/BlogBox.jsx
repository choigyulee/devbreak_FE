import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom"; // Link 컴포넌트 import

const BlogBox = ({ blogId, blogName, description }) => {
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
  box-sizing: border-box;
  display: flex; /* Flexbox를 사용하여 자식 요소 정렬 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  padding: 2.2vh 3vh;
  width: 20vw;
  height: 12.5vh;
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

const BlogName = styled.h3`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 700; /* 두꺼운 글씨 */
  font-size: 2.5vh; /* 제목 크기 */
  text-align: left;
  margin: 0; /* 기본 마진 제거 */
`;

const Content = styled.p`
  font-family: "Pretendard", sans-serif; /* 폰트 설정 */
  font-weight: 400; /* 일반 글씨 */
  font-size: 2vh; /* 내용 크기 */
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
BlogBox.propTypes = {
  blogId: PropTypes.number.isRequired, // blogId는 필수 숫자
  blogName: PropTypes.string.isRequired, // title은 필수 문자열
  description: PropTypes.string.isRequired, // contents는 필수 문자열
};

export default BlogBox;
