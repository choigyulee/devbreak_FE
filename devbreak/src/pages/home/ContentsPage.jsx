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


function ContentsPage() {
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); 
  const navigate = useNavigate(); // useNavigate 훅 사용

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleArticleId(articleId); // API 호출
        setArticle(fetchedArticle);
        setLiked(fetchedArticle.likeButton);
        setLikeCount(fetchedArticle.likeCount); 
      } catch (error) {
        console.error("글을 가져오는 중 에러 발생:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요!"); // 알림 표시
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      try {
        const updatedData = await putArticleArticleIdLike(articleId); // 좋아요 상태 업데이트
        setLiked(updatedData.likeButton);
        setLikeCount(updatedData.likeCount); 
      } catch (error) {
        console.error("좋아요 처리 중 에러 발생:", error);
      }
    }
  };

  if (!article) {
    return <div>로딩 중...</div>; // 기사 로딩 중 표시
  }

  const { about, problem, solution } = article;

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <TextContainer>
          <Title>{article.title}</Title>
          <NameAndData>
            {article.blogName} | {article.createdAt}
          </NameAndData>
          <ActivityItem
            language={about}
            problem={problem}
            solution={solution}
          />
          <ContentItem>{article.content}</ContentItem> {/* 마크다운 콘텐츠 렌더링 */}
        </TextContainer>
        <LikesItem liked={article.likeButton} likeCount={article.likeCount} handleLikeClick={handleLikeClick} />
        <LinkItem blogName={article.blogName} blogId={article.blogId} />
      </Container>
    </>
  );
}

export default ContentsPage;


const Container = styled.div`
  color: white;
  gap: 3vh;
  margin: 3vh 20vw 20vh 20vw;
  align-items: center;
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
