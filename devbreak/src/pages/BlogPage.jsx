import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useAuth } from "../context/AuthContext"; // 로그인 관련 훅
import getBlogBlogId from "../APIs/get/getBlogBlogId";
import BlogInfo from "../components/BlogPageItems/BlogInfo";
import BlogContent from "../components/BlogPageItems/BlogContent";
import getAuthInfo from "../APIs/get/getAuthInfo"; // 사용자 정보 가져오는 API 추가
import getIssuesAndCommits from "../APIs/get/getIssuesAndCommits"; // 수정된 API 호출

function BlogPage() {
  const { blogId } = useParams(); // 기존에 사용했던 blogId
  const navigate = useNavigate();
  const { isLoggedIn, onLogout } = useAuth();
  const [blogData, setBlogData] = useState(null);
  const [favButton, setFavButton] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activities, setActivities] = useState([]); // 활동 정보 상태
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // blogId로 블로그 정보를 가져옴
        const fetchedBlogData = await getBlogBlogId(blogId);
        setBlogData(fetchedBlogData);
        setFavButton(fetchedBlogData.fav_button);

        // blogData에서 git_repo_url 추출 후, 이슈 및 커밋 제목 가져오기
        const { git_repo_url } = fetchedBlogData;
        const issuesData = await getIssuesAndCommits(git_repo_url); // git_repo_url을 직접 전달
        setActivities(issuesData); // 활동 정보 상태 저장
      } catch (error) {
        setError("Failed to fetch blog data or activities.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      const fetchAuthInfo = async () => {
        try {
          const authInfo = await getAuthInfo();
          setCurrentUserId(authInfo.userName);
        } catch (error) {
          console.error("Error fetching auth info:", error);
        }
      };

      fetchAuthInfo(); // 로그인한 경우에만 사용자 정보 호출
    }

    fetchBlogData(); // 블로그 데이터는 항상 호출
  }, [blogId, isLoggedIn, navigate]);

  const handleFavButtonClick = () => setFavButton(!favButton);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!blogData) return <div>Blog not found.</div>;

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Container>
        <BlogInfo
          blogData={blogData}
          favButton={favButton}
          handleFavButtonClick={handleFavButtonClick}
          isLoggedIn={isLoggedIn}
          blogId={blogId}
          currentUserId={currentUserId}
        />
        <BlogContent
          blogData={blogData}
          isLoggedIn={isLoggedIn}
          blogId={blogId}
          navigate={navigate}
          currentUserId={currentUserId}
          activities={activities}
        />
      </Container>
    </>
  );
}

BlogPage.propTypes = {
  blogId: PropTypes.string.isRequired, // 블로그 ID 필수
  isLoggedIn: PropTypes.bool.isRequired, // 로그인 여부 필수
  blogData: PropTypes.object.isRequired, // 블로그 데이터
};

export default BlogPage;

const Container = styled.div`
  margin: 0vh 20vw 10vh 20vw; /* 좌우 마진을 20vw에서 10vw로 조정하여 반응형 개선 */
  display: flex;
  flex-direction: column;
  gap: 3vh;
  justify-content: center;
  align-items: center;
  font-family: "Urbanist";
  color: #ffffff;
`;
