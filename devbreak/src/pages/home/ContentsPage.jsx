import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getArticleArticleId from "../../APIs/get/getArticleArticleId";
import NavBar from "../../components/NavBar";
import styled from "@emotion/styled";
import ActivityItem from "../../components/ContentsPageItems/ActivityItem";
import ContentItem from "../../components/ContentsPageItems/ContentItem";
import LikesItem from "../../components/ContentsPageItems/LikesItem";
import LinkItem from "../../components/ContentsPageItems/LinkItem";
import { useAuth } from "../../context/AuthContext";
import putArticleArticleIdLike from "../../APIs/put/putArticleArticleIdLike";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditOrDeleteModal from "../../components/ContentsPageItems/EditOrDeleteModal";
import getAuthInfo from "../../APIs/get/getAuthInfo"; // 사용자 정보 가져오는 API

function ContentsPage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isWriter, setIsWriter] = useState(false); // 작성자 여부 상태
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 사용자 ID 상태
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        // 로그인한 사용자 정보 가져오기
        const authInfo = await getAuthInfo();
        setCurrentUserId(authInfo.userId); // 현재 사용자 ID를 state에 저장
      } catch (error) {
        console.error("Error fetching auth info:", error);
      }
    };

    const fetchArticle = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      try {
        // 기사 정보를 가져옵니다.
        const fetchedArticle = await getArticleArticleId(articleId);
        setArticle(fetchedArticle);
        setLikeCount(fetchedArticle.likeCount);

        // localStorage에서 'liked' 상태를 불러와서 설정
        const storedLikeStatus = localStorage.getItem(`liked_${articleId}`);
        if (storedLikeStatus !== null) {
          setLiked(JSON.parse(storedLikeStatus)); // 저장된 상태로 설정
        } else {
          // 처음 로드 시 서버에서 받은 likeButton 상태로 설정하고, 그 값을 localStorage에 저장
          setLiked(fetchedArticle.likeButton);
          localStorage.setItem(`liked_${articleId}`, JSON.stringify(fetchedArticle.likeButton));
        }

        // 작성자(userId)가 currentUserId와 같으면 isWriter를 true로 설정
        setIsWriter(fetchedArticle.userId === currentUserId);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (currentUserId) {
      fetchArticle();
    } else {
      fetchAuthInfo();
    }
  }, [articleId, isLoggedIn, currentUserId, navigate]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      alert("Please log in to use this feature.");
      navigate("/login");
      return;
    }
    try {
      const updatedData = await putArticleArticleIdLike(articleId);
      setLiked(updatedData.likeButton);
      setLikeCount(updatedData.likeCount);

      // 상태가 업데이트되면 localStorage에도 반영
      localStorage.setItem(`liked_${articleId}`, JSON.stringify(updatedData.likeButton));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleMenuClick = () => {
    setIsModalOpen((prev) => !prev); // 모달 상태를 반전시켜서 열거나 닫음
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const { about, problem, solution } = article;

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <TextContainer>
          <FirstLineContainer>
            <Title>{article.title}</Title>
            {isWriter && (
              <ButtonContaier>
                {isModalOpen && (
                  <EditOrDeleteModal blogId={article.blogId} articleId={articleId} onClose={handleModalClose} />
                )}
                <StyledBiDotsVerticalRounded onClick={handleMenuClick} />
              </ButtonContaier>
            )}
          </FirstLineContainer>
          <NameAndData>
            {article.blogName} | {article.createdAt}
          </NameAndData>
          <ActivityItem language={about} problem={problem} solution={solution} />
          <ContentItem>{article.content}</ContentItem>
        </TextContainer>
        <LikesItem liked={liked} likeCount={likeCount} handleLikeClick={handleLikeClick} />
        <LinkItem blogName={article.blogName} blogId={article.blogId} />
      </Container>
    </>
  );
}

export default ContentsPage;

const Container = styled.div`
  color: white;
  gap: 3vh;
  margin: 0vh 20vw 20vh 20vw;
  align-items: center;
`;

const FirstLineContainer = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const ButtonContaier = styled.div`
  justify-content: end;
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vh;
  width: 60vw;
`;

const Title = styled.p`
  font-size: 5vh;
  font-weight: 700;
  font-family: "pretendard";
`;

const NameAndData = styled.div`
  font-size: 2.8vh;
  font-weight: 400;
  color: #a7a7a7;
`;

const StyledBiDotsVerticalRounded = styled(BiDotsVerticalRounded)`
  cursor: pointer; /* 포인터 커서 */
  font-size: 2rem; /* 아이콘 크기 */
  color: white; /* 기본 색상 */
  transition: color 0.3s;

  &:hover {
    color: #888; /* 호버 시 색상 변경 */
  }
`;
