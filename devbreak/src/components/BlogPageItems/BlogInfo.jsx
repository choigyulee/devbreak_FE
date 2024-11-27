import styled from "@emotion/styled";
import { BsStarFill, BsGithub, BsPencil } from "react-icons/bs";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import putBlogBlogIdFavorites from "../../APIs/put/putBlogBlogIdFavorites";


function BlogInfo({ blogData, favButton, handleFavButtonClick, isLoggedIn, blogId, currentUserId }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(favButton); 

  const handleGitHubClick = () => window.open(blogData.git_repo_url, "_blank");

  const handlePencilClick = () => {
    navigate(`/blog/${blogId}/write`); // 블로그 수정 페이지로 이동
  };

  // 사용자가 블로그의 멤버인지 확인
  const isMember = blogData.members.includes(currentUserId);
  console.log("Current User ID:", currentUserId);
  console.log("Blog Members:", blogData.members);
  console.log("Is Member:", isMember);

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      // 로그인하지 않은 상태에서 즐겨찾기 버튼을 클릭했을 경우 처리
      alert("Please log in to add to favorites.");
      navigate("/login");
      return;
    }

    try {
      // 즐겨찾기 API 호출
      const updatedBlogData = await putBlogBlogIdFavorites(blogId);
      setIsFavorite(updatedBlogData.favButton); // 즐겨찾기 상태 업데이트
      handleFavButtonClick(updatedBlogData.favButton); // 부모 컴포넌트에 상태 반영
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };


  return (
    <InfoContainer>
      <NameContainer>
        <BlogName>{blogData.blog_name}</BlogName>
        <StarButton
          onClick={handleFavoriteClick}
          style={{
            color: favButton ? "#FFEC4C" : "white",
          }}
        >
          <BsStarFill size={30} />
        </StarButton>
      </NameContainer>
      <DescriptionContainer>
        <BlogDescription>
          {blogData.description}
          <IconContainer onClick={handleGitHubClick}>
            <BsGithub size={24} />
          </IconContainer>
          {isLoggedIn &&
            isMember && ( // 로그인 상태이고 블로그 멤버일 때만 연필 아이콘 표시
              <IconContainer onClick={handlePencilClick}>
                <BsPencil size={24} />
              </IconContainer>
            )}
        </BlogDescription>
      </DescriptionContainer>
    </InfoContainer>
  );
}

BlogInfo.propTypes = {
  blogData: PropTypes.object.isRequired,
  favButton: PropTypes.bool.isRequired,
  handleFavButtonClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  blogId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired, // 현재 사용자 ID prop 추가
};

export default BlogInfo;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 52vw;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.6vw;
  margin-bottom: 2vh;
`;

const BlogName = styled.div`
  font-size: 3.5vh;
  font-weight: bold;
  margin: 0;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.9;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

const BlogDescription = styled.div`
  font-size: 2.5vh;
  max-width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
`;

const IconContainer = styled.div`
  margin-left: 1.5vw;
  cursor: pointer;
`;
