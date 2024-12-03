import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import ContentItem from "../ContentsPageItems/ContentItem";

function MarkdownEditor({ content, setContent }) {
  const [isPreviewVisible, setPreviewVisible] = useState(false); // 프리뷰 상태 관리
  const [isLoading, setLoading] = useState(false); // 로딩 상태 관리

  const handleInputChange = (e) => {
    setContent(e.target.value); // 사용자가 입력한 내용을 상태로 저장
  };

  const handlePreviewToggle = () => {
    // 프리뷰 상태만 전환하며 로그아웃 상태에 영향을 주지 않음
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      setPreviewVisible((prev) => !prev); // 프리뷰 상태 전환
      setLoading(false); // 로딩 종료
    }, 300); // 지연 시간 추가로 로딩 효과 구현
  };

  return (
    <>
      <PreviewButton
        onClick={(e) => {
          e.preventDefault(); // 버튼 클릭 시 기본 동작 방지
          handlePreviewToggle();
        }}
      >
        Toggle Preview
      </PreviewButton>
      <MarkdownContainer>
        {!isPreviewVisible ? (
          <Editor>
            <textarea value={content} onChange={handleInputChange} placeholder="Write your content in Markdown..." />
          </Editor>
        ) : (
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

export default MarkdownEditor;

const MarkdownContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Editor = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    height: 50vh;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    font-size: 2vh;
    color: #ffffff;
    padding: 15px;
    resize: none;
    overflow-y: auto; /* 스크롤바 강제 활성화 */

    &:focus {
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    ::-webkit-scrollbar {
      width: 8px; /* 스크롤바 너비를 조금 더 두껍게 */
    }
    ::-webkit-scrollbar-thumb {
      background-color: #666666; /* 스크롤바 색상을 회색으로 */
      border-radius: 10px; /* 둥근 모서리 */
    }
    ::-webkit-scrollbar-track {
      background-color: #1e1e1e; /* 트랙 배경을 어두운 색으로 */
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
  height: 500px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const LoadingMessage = styled.p`
  color: #ffffff;
  font-size: 18px;
  text-align: center;
`;
