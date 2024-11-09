import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
function ContentsPage() {
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  return (
    <>
      <NavBar></NavBar>
      <Container>Contents for Article ID: {articleId}</Container>
    </>
  );
}
export default ContentsPage;

const Container = styled.div`
  color: white;
`;
