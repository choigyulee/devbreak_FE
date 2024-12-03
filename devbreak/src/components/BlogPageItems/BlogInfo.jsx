/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { BsGithub, BsPencil } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogDeleteModal from "./BlogDeleteModal";
import styled from "@emotion/styled";
import StarItem from "./StarItem";
import putBlogBlogIdFavorites from "../../APIs/put/putBlogBlogIdFavorites";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";

function BlogInfo({ blogData, isLoggedIn, blogId, currentUserId }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followed, setFollowed] = useState(false); // 즐겨찾기 상태

  // blogId로 블로그 정보 불러오기
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blog = await getBlogBlogId(blogId); // API 호출로 블로그 정보 얻기

        // 로컬 저장소에서 즐겨찾기 상태 확인
        const storedFavoriteStatus = localStorage.getItem(`fav_button_${blogId}`);
        if (storedFavoriteStatus !== null) {
          setFollowed(JSON.parse(storedFavoriteStatus)); // 로컬 저장소에 저장된 값 사용
        } else {
          // 로컬 저장소에 없는 경우 서버에서 받은 fav_button 값으로 설정
          setFollowed(blog.fav_button);
          localStorage.setItem(`fav_button_${blogId}`, JSON.stringify(blog.fav_button)); // 로컬 저장소에 설정
        }
      } catch (error) {
        console.error("블로그 즐겨찾기 정보 가져오기 실패:", error);
      }
    };

    fetchBlogData();
  }, [blogId]); // blogId가 변경될 때마다 재호출

  // 즐겨찾기 상태 변경
  const handleFollowClick = async () => {
    if (!isLoggedIn) {
      alert("Please log in to use this feature.");
      navigate("/login");
      return;
    }

    try {
      // 즐겨찾기 API 호출 (서버에서 상태 반영)
      const updatedBlogData = await putBlogBlogIdFavorites(blogId);

      // 상태 반전
      const newFavStatus = !followed;
      setFollowed(newFavStatus);

      // 로컬 저장소에 반영
      localStorage.setItem(`fav_button_${blogId}`, JSON.stringify(newFavStatus));
    } catch (error) {
      console.error("즐겨찾기 업데이트 오류:", error);
    }
  };

  // GitHub 클릭 시
  const handleGitHubClick = () => window.open(blogData.git_repo_url, "_blank");

  // 수정 페이지로 이동
  const handlePencilClick = () => {
    navigate(`/blog/${blogId}/edit`);
  };

  // 휴지통 아이콘 클릭 시 모달 열기
  const handleTrashClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isMember = blogData.members.includes(currentUserId);

  return (
    <>
      <InfoContainer>
        <NameContainer>
          <BlogName>{blogData.blog_name}</BlogName>
          <StarItem followed={followed} handleFollowClick={handleFollowClick} />
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
      {isModalOpen && <BlogDeleteModal blogId={blogId} onClose={handleCloseModal} />}
    </>
  );
}

BlogInfo.propTypes = {
  blogData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  blogId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default BlogInfo;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 3vh;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8vw;
  margin-bottom: 2vh;
`;

const BlogName = styled.div`
  font-size: 3.5vh;
  font-weight: bold;
  margin: 0;
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
