import styled from "@emotion/styled";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // 리액트 아이콘의 하트 아이콘

function ContentsPage() {
  const { isLoggedIn } = useAuth();
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 여기서 API 호출을 통해 articleId에 해당하는 글을 가져옵니다.
    const fetchArticle = async () => {
      // 실제 API 호출로 대체해야 합니다.
      // 예시로 주어진 JSON 데이터를 사용합니다.
      const fetchedArticle = {
        articleId: 2,
        blogId: 1,
        userId: 1,
        title: "Breakthrough title",
        blogName: "blog name",
        content:
          "a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo.a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo.a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo. a lot of contents in breakthrough. It's 2:58 AM. very sleeeeeeeeeeeeepy now. but I can't sleep now. because I have soooooooooo many task. nae ga whae gaebaleul handa haeseo yee gosangeul haneunji jeongong jalmot gollateoyo.",
        likeCount: 0,
        likeButton: false,
        createdAt: "2024.10.17",
        updatedAt: "2024.10.17",
      };
      setArticle(fetchedArticle);
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <Container>Loading...</Container>; // 데이터 로딩 중 표시
  }

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요!"); // 알림 표시
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      setLiked((prevLiked) => !prevLiked); // 좋아요 상태 토글
    }
  };

  if (!article) {
    return <Container>Loading...</Container>; // 데이터 로딩 중 표시
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <TextContainer>
          <Title>{article.title}</Title>
          <NameAndData>
            {article.blogName} | {article.createdAt}
          </NameAndData>
          <ActivityContainer>
            <Category>
              About <p>category</p>
            </Category>
            <Problem>
              Problem <p>what a issue title</p>
            </Problem>
            <Solution>
              Solution <p>how to solve the problem</p>
            </Solution>
          </ActivityContainer>
          <Content>{article.content}</Content>
        </TextContainer>
        <LikesContainer liked={liked}>
          <StyledFaHeart onClick={handleLikeClick} /> {/* 클릭 이벤트 핸들러 추가 */}
          <span>{article.likeCount}</span>
        </LikesContainer>
        <LinkContainer>
          <span className="comment">If you are curious about which blog this article is from,</span>
          <span className="button">
            {article.blogName}
            <Link to={`/blog/${article.blogId}`}>
              <Button>Go To See</Button>
            </Link>
          </span>
        </LinkContainer>
      </Container>
    </>
  );
}

export default ContentsPage;

const Container = styled.div`
  color: white;
  gap: 3vh;
  margin: 2.5vh 16vw 13vh 16vw;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Title = styled.p`
  font-size: 4vh;
  font-weight: 700;
  font-family: "pretendard";
`;

const NameAndData = styled.div`
  font-size: 2.8vh;
  font-weight: 400;
  color: #a7a7a7;
`;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 30vw;
`;

const Category = styled.div`
  font-size: 2vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    color: #ffffff;
  }
`;

const Problem = styled.div`
  font-size: 2vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    color: #ffffff;
  }
`;

const Solution = styled.div`
  font-size: 2vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #a7a7a7;
  line-height: 3.5vh;
  display: flex;
  flex-direction: row;
  gap: 2vh;
  p {
    color: #ffffff;
  }
`;

const Content = styled.p`
  font-size: 2vh;
  font-family: "pretendard";
  font-weight: 400;
  color: #c9c9c9;
  line-height: 3.5vh;
  margin: 2vh;
`;

const LikesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4vh 2vh 2vh 3vh;
  gap: 1.5vh;
  span {
    font-size: 3vh;
    font-weight: 400;
    color: ${(props) => (props.liked ? "#FF4F4F" : "#a7a7a7")}; // 좋아요 상태에 따라 색상 변경
  } // 좋아요 수를 강조하기 위해 색상 변경
`;

const StyledFaHeart = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#FF4F4F" : "#a7a7a7")};
  font-size: 3vh;
  :hover {
    color: #ff6060;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  border: 1px solid #02f798;
  border-radius: 3vh;
  padding: 6vh 11vh;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  backdrop-filter: blur(40px);

  .comment {
    font-size: 4vh;
    color: #c9c9c9;
    font-family: "pretendard";
    font-weight: 400;
  }

  .button {
    font-size: 4.8vh;
    font-family: "pretendard";
    font-weight: 700;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 6vh 0 2vh 0;
  }
`;

const Button = styled.button`
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 2vh 3vh;
  font-size: 3vh;
  font-family: "pretendard";
  font-weight: 700;
  border-radius: 2vh;
  cursor: pointer;
  backdrop-filter: blur(40px);

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 5px #02f798;
  }
`;
