import { useNavigate } from "react-router-dom";
import routes from "../routes";
import styled from "@emotion/styled";
import SiteButton from "../components/SiteButton";

const SitemapPage = () => {
  const navigate = useNavigate();

  const elements = routes
    .filter((route) => route.name)
    .map((route) => (
      <SiteButton
        key={route.path}
        text={route.name}
        onClick={() => {
          navigate(route.samplePath || route.path);
        }}
      />
    ));

  return <Container>{elements}</Container>;
};

export default SitemapPage;

const Container = styled.div`
  /* 스타일 규칙 추가 */
  height: 100vh; /* 전체 화면 높이 */
  width: 100vw; /* 전체 화면 너비 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  gap: 1.5vh;
`;
