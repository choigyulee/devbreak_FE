import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa"; // 리액트 아이콘의 하트 아이콘
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtoms";
import LinkItem from "../../components/ContentsPageItems/LinkItem";
import LikesItem from "../../components/ContentsPageItems/LikesItem";
import ActivityItem from "../../components/ContentsPageItems/ActivityItem";
import ContentItem from "../../components/ContentsPageItems/ContentItem";

function ContentsPage() {
  const { articleId } = useParams(); // URL에서 articleId 가져오기
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  // Recoil 상태로부터 로그인 상태를 가져옴
  const { isLoggedIn } = useRecoilValue(authState); // useRecoilValue를 사용하여 로그인 상태 가져오기

  useEffect(() => {
    const fetchArticle = async () => {
      // 여기서 실제로 API 호출 등을 할 수 있음. 현재는 더미 데이터로 설정
      const fetchedArticle = {
        articleId: 2,
        blogId: 1,
        userId: 1,
        title: "Breakthrough title",
        blogName: "blog name",

        content:
          '# Welcome to the Markdown Showcase!\n\nMarkdown is a lightweight markup language with plain-text formatting syntax.\nIt\'s widely used for documentation and content creation. Let\'s explore all its features.\n\nMarkdown is a lightweight markup language with plain-text formatting syntax.\n\\nIt\'s widely used for documentation and content creation. Let\'s explore all its features.\n\n---\n\n## Table of Contents\n1. [Headers](#headers)\n2. [Text Styles](#text-styles)\n3. [Links and Images](#links-and-images)\n4. [Lists](#lists)\n5. [Code Blocks](#code-blocks)\n6. [Blockquotes](#blockquotes)\n7. [Tables](#tables)\n8. [Horizontal Lines](#horizontal-lines)\n\n---\n\n## Headers\nMarkdown supports six levels of headers:\n\n# H1 - Largest Header  \n## H2 - Second Largest Header  \n### H3 - Third Largest Header  \n#### H4 - Fourth Largest Header  \n##### H5 - Fifth Largest Header  \n###### H6 - Smallest Header  \n\n---\n\n## Text Styles\n\n- **Bold text**: `**bold text**` or `__bold text__`\n- *Italic text*: `*italic text*` or `_italic text_`\n- ***Bold and Italic***: `***bold and italic***`\n- ~~Strikethrough~~: `~~strikethrough~~`\n- `Inline code` : ``Use backticks (`) for inline code``\n\n---\n\n## Links and Images\n\n### Links\nYou can add links like this:  \n- [OpenAI](https://openai.com)\n- [Markdown Guide](https://www.markdownguide.org)\n\n### Images\nInclude images like this:  \n![OpenAI Logo](https://via.placeholder.com/150 "Placeholder Image")\n\n---\n\n## Lists\n\n### Unordered List\n- Item 1\n  - Subitem 1.1\n  - Subitem 1.2\n- Item 2\n\n### Ordered List\n1. Step 1\n   1. Sub-step 1.1\n   2. Sub-step 1.2\n2. Step 2\n\n---\n\n## Code Blocks\n\n### Inline Code\nThis is `inline code`.\n\n### Block Code\n```javascript\n// JavaScript Example\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\ngreet("World");\n```\n\n---\n\n## Blockquotes\n\n> "The best way to predict the future is to invent it."  \n> — Alan Kay\n\n---\n\n## Tables\n\n| Name       | Age | Country  |\n|------------|-----|----------|\n| Alice      | 25  | USA      |\n| Bob        | 30  | Canada   |\n| Charlie    | 35  | UK       |\n\n---\n\n## Horizontal Lines\nYou can separate content using horizontal lines:\n\n---\n---\n### Thanks for reading!\nMarkdown is simple yet powerful. Try it out for your next project!',

        likeCount: 0,
        likeButton: false,
        createdAt: "2024.10.17",
        updatedAt: "2024.10.17",
      };
      setArticle(fetchedArticle);
    };

    fetchArticle();
  }, [articleId]);

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요!"); // 알림 표시
      navigate("/login"); // 로그인 페이지로 이동
    } else {
      setLiked((prevLiked) => !prevLiked); // 좋아요 상태 토글
    }
  };

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
            language="Programing Language"
            problem="what a issue title"
            solution="how to solve the problem"
          />
          <ContentItem>{article.content}</ContentItem> {/* 마크다운 콘텐츠 렌더링 */}
        </TextContainer>
        <LikesItem liked={liked} likeCount={article.likeCount} handleLikeClick={handleLikeClick} />
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
