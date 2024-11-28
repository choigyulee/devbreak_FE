import styled from "@emotion/styled";
import { BsStarFill, BsGithub, BsPencil } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import putBlogBlogIdFavorites from "../../APIs/put/putBlogBlogIdFavorites";
import BlogDeleteModal from "./BlogDeleteModal";
import deleteBlogBlogId from "../../APIs/delete/deleteBlogBlogId";

function BlogInfo({ blogData, favButton, handleFavButtonClick, isLoggedIn, blogId, currentUserId }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(favButton);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleGitHubClick = () => window.open(blogData.git_repo_url, "_blank");

  const handlePencilClick = () => {
    navigate(`/blog/${blogId}/edit`); // 블로그 수정 페이지로 이동
  };

  // 휴지통 아이콘 클릭 시 모달 열기
  const handleTrashClick = () => {
    setIsModalOpen(true);
  };

  // 블로그 삭제 확인 후 삭제 실행
  const handleConfirmDelete = async () => {
    try {
      console.log(`블로그 삭제 중: ${blogId}`);
      // 블로그 삭제 API 호출
      await deleteBlogBlogId(blogId);
      setIsModalOpen(false);
      alert("블로그가 성공적으로 삭제되었습니다.");
      navigate("/workspace"); // 삭제 후 홈 화면으로 이동
    } catch (error) {
      console.error("블로그 삭제 오류:", error);
      alert("블로그 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isMember = blogData.members.includes(currentUserId);

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      alert("로그인 후 즐겨찾기를 추가할 수 있습니다.");
      navigate("/login");
      return;
    }

    try {
      const updatedBlogData = await putBlogBlogIdFavorites(blogId);
      setIsFavorite(updatedBlogData.favButton);
      handleFavButtonClick(updatedBlogData.favButton);
    } catch (error) {
      console.error("즐겨찾기 업데이트 오류:", error);
    }
  };

  return (
    <>
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
            {isLoggedIn && isMember && (
              <IconContainer>
                <BsPencil size={24} onClick={handlePencilClick} />
                <FaRegTrashCan size={24} onClick={handleTrashClick} />
              </IconContainer>
            )}
          </BlogDescription>
        </DescriptionContainer>
      </InfoContainer>

      {/* 삭제 모달 */}
      {isModalOpen && <BlogDeleteModal onClose={handleCloseModal} onConfirm={handleConfirmDelete} />}
    </>
  );
}

BlogInfo.propTypes = {
  blogData: PropTypes.object.isRequired,
  favButton: PropTypes.bool.isRequired,
  handleFavButtonClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  blogId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
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
  margin-left: 0.7vw;
  display: flex;
  flex-direction: row;
  gap: 0.7vw;
  cursor: pointer;
`;
