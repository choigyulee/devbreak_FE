import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import PropTypes from "prop-types";
import { useAuth } from "../../AuthContext";

function ContentsPage() {
  const { isLoggedIn } = useAuth;
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>Contents for Article ID: {articleId}</Container>
    </>
  );
}

ContentsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // 이 부분은 더 이상 필요하지 않음
};

export default ContentsPage;

const Container = styled.div`
  color: white;
`;
