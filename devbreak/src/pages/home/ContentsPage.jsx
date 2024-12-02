import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getArticleArticleId from "../../APIs/get/getArticleArticleId";
import NavBar from "../../components/NavBar";
import styled from "@emotion/styled";
import ActivityItem from "../../components/ContentsPageItems/ActivityItem";
import ContentItem from "../../components/ContentsPageItems/ContentItem";
import LikesItem from "../../components/ContentsPageItems/LikesItem";
import LinkItem from "../../components/ContentsPageItems/LinkItem";
import CommentItem from "../../components/ContentsPageItems/CommentItem"; // 댓글 컴포넌트 추가
import { useAuth } from "../../context/AuthContext";
import putArticleArticleIdLike from "../../APIs/put/putArticleArticleIdLike";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditOrDeleteModal from "../../components/ContentsPageItems/EditOrDeleteModal";
import getAuthInfo from "../../APIs/get/getAuthInfo"; // 사용자 정보 가져오는 API
import getCommentArticleId from "../../APIs/get/getCommentArticleId";
import postComment from "../../APIs/post/postComment";

function ContentsPage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isWriter, setIsWriter] = useState(false); // 작성자 여부 상태
  // eslint-disable-next-line no-unused-vars
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 사용자 ID 상태
  const [comments, setComments] = useState([]); // 댓글 리스트 상태
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 기사 정보 가져오기
        const fetchedArticle = await getArticleArticleId(articleId);
        setArticle(fetchedArticle);
        setLikeCount(fetchedArticle.likeCount);

        // localStorage에서 'liked' 상태를 불러와서 설정
        const storedLikeStatus = localStorage.getItem(`liked_${articleId}`);
        if (storedLikeStatus !== null) {
          setLiked(JSON.parse(storedLikeStatus));
        } else {
          setLiked(fetchedArticle.likeButton);
          localStorage.setItem(`liked_${articleId}`, JSON.stringify(fetchedArticle.likeButton));
        }

        // 로그인한 경우 사용자 정보와 작성자 여부 체크
        if (isLoggedIn) {
          const authInfo = await getAuthInfo();
          setCurrentUserId(authInfo.userId);
          setIsWriter(fetchedArticle.userId === authInfo.userId);
        }

        // 댓글 리스트 가져오기
        const fetchedComments = await getCommentArticleId(articleId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching article or comments:", error);
      }
    };

    fetchData();
  }, [articleId, isLoggedIn]);

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
      localStorage.setItem(`liked_${articleId}`, JSON.stringify(updatedData.likeButton));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleMenuClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddComment = async (newContent) => {
    try {
      const newComment = await postComment(articleId, newContent);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
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
            {isLoggedIn && isWriter && (
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
        <CommentItem comments={comments} onAddComment={handleAddComment} />
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
  cursor: pointer;
  font-size: 2rem;
  color: white;
  transition: color 0.3s;

  &:hover {
    color: #888;
  }
`;
