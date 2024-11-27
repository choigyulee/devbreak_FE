import styled from "@emotion/styled";
import { BsStarFill, BsGithub, BsPencil } from "react-icons/bs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BlogInfo({ blogData, favButton, handleFavButtonClick, isLoggedIn, blogId, currentUserId }) {
  const navigate = useNavigate();

  const handleGitHubClick = () => window.open(blogData.git_repo_url, "_blank");

  const handlePencilClick = () => {
    navigate(`/blog/${blogId}/write`); // 블로그 수정 페이지로 이동
  };

  // 사용자가 블로그의 멤버인지 확인
  const isMember = blogData.members.includes(currentUserId);
  console.log("Current User ID:", currentUserId);
  console.log("Blog Members:", blogData.members);
  console.log("Is Member:", isMember);

  return (
    <InfoContainer>
      <NameContainer>
        <BlogName>{blogData.blog_name}</BlogName>
        <StarButton
          onClick={handleFavButtonClick}
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
