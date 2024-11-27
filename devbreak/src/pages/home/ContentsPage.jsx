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
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleArticleId(articleId);
        setArticle(fetchedArticle);
        setLiked(fetchedArticle.likeButton);
        setLikeCount(fetchedArticle.likeCount);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      alert("Please log in to use this feature.");
      navigate("/login");
    } else {
      try {
        const updatedData = await putArticleArticleIdLike(articleId);
        setLiked(updatedData.likeButton);
        setLikeCount(updatedData.likeCount);
      } catch (error) {
        console.error("Error updating like:", error);
      }
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
          <Title>{article.title}</Title>
          <NameAndData>{article.blogName} | {article.createdAt}</NameAndData>
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
