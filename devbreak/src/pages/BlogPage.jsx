import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
// import { useAuth } from "../context/AuthContext";

function BlogPage() {
  const { isLoggedIn } = useAuth(); // useAuth 훅을 사용하여 로그인 상태 가져오기
  const { blogId } = useParams(); // URL에서 articleId 가져오기
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>Contents for Article ID: {blogId}</Container>
    </>
  );
}

// BlogPage.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired, // 이 부분은 더 이상 필요하지 않음
// };

export default BlogPage;

const Container = styled.div`
  color: white;
`;
