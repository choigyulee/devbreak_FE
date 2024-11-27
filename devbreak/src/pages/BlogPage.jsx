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

function BlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, onLogout } = useAuth(); // 로그인 상태 및 로그아웃 함수
  const [blogData, setBlogData] = useState(null);
  const [favButton, setFavButton] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 사용자 ID 상태 추가

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogData = await getBlogBlogId(blogId);
        setBlogData(fetchedBlogData);
        setFavButton(fetchedBlogData.fav_button);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    const fetchAuthInfo = async () => {
      try {
        const authInfo = await getAuthInfo(); // 사용자 정보 가져오기
        setCurrentUserId(authInfo.userName); // user_name을 currentUserId로 설정
      } catch (error) {
        console.error("Error fetching auth info:", error);
      }
    };

    fetchBlogData();
    fetchAuthInfo(); // 사용자 정보 가져오기 함수 호출
  }, [blogId]);

  const handleFavButtonClick = () => setFavButton(!favButton);

  if (!blogData) return <div>Loading...</div>;

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
          currentUserId={currentUserId} // 현재 사용자 ID 전달
        />
        <BlogContent
          blogData={blogData}
          isLoggedIn={isLoggedIn}
          blogId={blogId}
          navigate={navigate}
          currentUserId={currentUserId} // BlogContent에도 currentUserId 전달
        />
      </Container>
    </>
  );
}

BlogPage.propTypes = {
  blogId: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  blogData: PropTypes.object,
};

export default BlogPage;

const Container = styled.div`
  margin: 3vh 20vw 20vh 20vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  justify-content: center;
  align-items: center;
  font-family: "Urbanist";
  color: #ffffff;
`;
