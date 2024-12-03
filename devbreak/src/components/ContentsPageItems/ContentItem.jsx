import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "@emotion/styled";

function ContentItem({ children }) {
  const renderers = {
    // 링크
    a: ({ href, children }) => (
      <a href={href} style={{ color: "#71FFC9", textDecoration: "underline" }}>
        {children}
      </a>
    ),
    // 텍스트 스타일
    strong: ({ children }) => <strong style={{ fontWeight: "700", color: "#71FFC9" }}>{children}</strong>,
    em: ({ children }) => <em style={{ fontStyle: "italic", color: "#71FFC9" }}>{children}</em>,
    del: ({ children }) => <del style={{ textDecoration: "line-through", color: "white" }}>{children}</del>,
    // 헤더
    h1: ({ children }) => (
      <h1 style={{ fontSize: "3.9vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: "3.5vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontSize: "3.1vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ fontSize: "2.7vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 style={{ fontSize: "2.8vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 style={{ fontSize: "2.5vh", fontWeight: "700", color: "white", margin: "1.5vh 0" }}>{children}</h6>
    ),
    // 리스트
    ul: ({ children }) => <ul style={{ listStyleType: "circle", paddingLeft: "2vh", color: "white" }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ listStyleType: "decimal", paddingLeft: "2vh", color: "white" }}>{children}</ol>,
    li: ({ children }) => <li style={{ marginBottom: "1vh", color: "white" }}>{children}</li>,
    // 인용문
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "0.5vh solid #71FFC9",
          paddingLeft: "2vh",
          color: "#71FFC9",
          fontStyle: "italic",
          margin: "1vh 0",
        }}
      >
        {children}
      </blockquote>
    ),
    // 코드 블록
    code: ({ children }) => (
      <code
        style={{
          backgroundColor: "#424347",
          color: "#71FFC9",
          padding: "0.5vh 1vh",
          borderRadius: "0.5vh",
          fontFamily: "monospace",
        }}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          backgroundColor: "#424347",
          color: "#71FFC9",
          padding: "1vh 2vh",
          borderRadius: "1vh",
          overflowX: "auto",
          margin: "1.5vh 0",
        }}
      >
        {children}
      </pre>
    ),
    // 테이블
    table: ({ children }) => (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        {children}
      </table>
    ),
    thead: ({ children }) => <thead style={{ backgroundColor: "#424347", color: "#ffffff" }}>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th
        style={{
          border: "0.2vh solid #606060",
          padding: "1vh",
          textAlign: "left",
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          border: "0.2vh solid #606060",
          padding: "1vh",
          textAlign: "left",
        }}
      >
        {children}
      </td>
    ),
    // 수평선
    hr: () => <hr style={{ border: "0.2vh solid #5c5c5c", margin: "1vh 0" }} />,
    // 이미지
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "2vh auto",
        }}
      />
    ),
    // 텍스트 기본 설정
    p: ({ children }) => (
      <p style={{ color: "#c9c9c9", margin: "0.5vh 0", lineHeight: "3vh", fontSize: "2.5vh" }}>{children}</p>
    ),
  };

  return (
    <ContentWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
        {children}
      </ReactMarkdown>
    </ContentWrapper>
  );
}

ContentItem.propTypes = {
  children: PropTypes.string.isRequired,
};

// 추가된 스타일
const ContentWrapper = styled.div`
  width: 100%; 
  max-width: 990px; /* 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  font-family: "Pretendard", sans-serif; /* Pretendard 폰트 적용 */
  line-height: 5vh;
`;

export default ContentItem;
