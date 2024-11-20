import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import ContentItem from "../ContentsPageItems/ContentItem";

function MarkdownEditor({ content, setContent }) {
  const [isPreviewVisible, setPreviewVisible] = useState(false); // 프리뷰를 볼지 여부
  const [isLoading, setLoading] = useState(false); // 로딩 상태

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handlePreviewToggle = () => {
    setLoading(true); // 프리뷰 로딩 시작
    setPreviewVisible((prev) => !prev);
    setLoading(false); // 로딩 종료 (프리뷰가 나타날 때)
  };

  return (
    <>
      <PreviewButton onClick={handlePreviewToggle}>Toggle Preview</PreviewButton>
      <MarkdownContainer>
        {!isPreviewVisible && (
          <Editor>
            <textarea value={content} onChange={handleInputChange} placeholder="Write your content in Markdown..." />
          </Editor>
        )}

        {isPreviewVisible && (
          <Preview>
            {isLoading ? <LoadingMessage>Loading...</LoadingMessage> : <ContentItem>{content}</ContentItem>}
          </Preview>
        )}
      </MarkdownContainer>
    </>
  );
}

MarkdownEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

const MarkdownContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Editor = styled.div`
  width: 100%; /* 텍스트 에디터가 전면에 나옴 */
  textarea {
    width: 100%;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    font-size: 2vh;
    color: #ffffff;
    padding: 15px;
    resize: none;

    &:focus {
      outline: none;
    }
  }
`;

const PreviewButton = styled.button`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 2vh;
  padding: 1vh 2vh;
  margin-left: 2vh;
  backdrop-filter: blur(40px);
  font-size: 2vh;
  color: #ffffff;
  &:hover {
    border: 1px solid #02f798;
    color: #02f798;
  }
`;

const Preview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  color: #ffffff;
  overflow-y: auto;
  height: 500px; /* 프리뷰 높이 늘리기 */
`;

const LoadingMessage = styled.p`
  color: #ffffff;
  font-size: 18px;
  text-align: center;
`;

export default MarkdownEditor;
