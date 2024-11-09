import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
function BlogPage() {
  const { blogId } = useParams(); // URL에서 articleId 가져오기
  return (
    <>
      <Container>Contents for Article ID: {blogId}</Container>
    </>
  );
}
export default BlogPage;

const Container = styled.div`
  color: white;
`;
