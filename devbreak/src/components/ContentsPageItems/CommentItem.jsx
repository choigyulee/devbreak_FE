/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CommentModal from "./CommentModal";
import putCommentCommentId from "../../APIs/put/putCommentCommentId";

function CommentItem({ comments, onAddComment, isLoggedIn, articleId }) {
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null); // 현재 선택된 댓글 ID
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용

  const handleInputChange = (e) => {
    if (!isLoggedIn) {
      alert("Login is required to access this service!\nPlease log in to continue.");
      return;
    }
    setNewComment(e.target.value);
  };

  const handleSendClick = () => {
    if (newComment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  const handleMenuClick = (commentId) => {
    if (isModalOpen && selectedCommentId === commentId) {
      // 이미 열려있는 모달을 닫음
      closeModal();
    } else {
      // 모달을 염
      setSelectedCommentId(commentId);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCommentId(null);
  };

  const startEditing = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const saveEdit = async () => {
    if (!editingContent.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    // API 호출 전에 전송할 데이터 출력
    console.log("Sending data to API:", {
      commentId: editingCommentId,
      articleId: articleId,
      content: editingContent,
    });

    try {
      await putCommentCommentId({
        commentId: editingCommentId,
        articleId: articleId,
        content: editingContent,
      });
      alert("Comment updated successfully.");
      cancelEditing();
    } catch (error) {
      alert("Failed to update comment.");
    }
  };

  return (
    <CommentContainer>
      <InputArea>
        <CommentInput
          type="text"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={handleInputChange}
        />
        <AddButton onClick={handleSendClick}>Add</AddButton>
      </InputArea>
      <ListContainer>
        {comments.length === 0 ? (
          <EmptyState>There is no Comment!</EmptyState>
        ) : (
          comments.map((comment) => (
            <ListItem key={comment.commentId}>
              <ListItemHeader>
                <ListItemHeaderOne>
                  <UserName>{comment.userName}</UserName>
                  <Date>{comment.date}</Date>
                </ListItemHeaderOne>
                {(comment.updateButton || comment.deleteButton) && (
                  <ButtonContaier>
                    {isModalOpen && (
                      <CommentModal
                        onClose={closeModal}
                        commentId={selectedCommentId}
                        onEdit={(commentId) =>
                          startEditing(commentId, comments.find((c) => c.commentId === commentId).content)
                        }
                        onDelete={(commentId) => {
                          // 여기에 삭제 API 호출 로직 추가
                          console.log(`Delete comment with ID: ${commentId}`);
                        }}
                      />
                    )}
                    <StyledBiDotsVerticalRounded onClick={() => handleMenuClick(comment.commentId)} />
                  </ButtonContaier>
                )}
              </ListItemHeader>
              {editingCommentId === comment.commentId ? (
                <EditArea>
                  <EditInput value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
                  <ButtonLine>
                    <EditButton onClick={saveEdit}>Edit</EditButton>
                    <CancelButton onClick={cancelEditing}>Cancel</CancelButton>
                  </ButtonLine>
                </EditArea>
              ) : (
                <Content>{comment.content}</Content>
              )}
            </ListItem>
          ))
        )}
      </ListContainer>
    </CommentContainer>
  );
}

CommentItem.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      updateButton: PropTypes.bool,
      deleteButton: PropTypes.bool,
    })
  ).isRequired,
  onAddComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  articleId: PropTypes.number.isRequired, // Article ID 추가
};

export default CommentItem;

// Styled Components

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3vh;
`;

const InputArea = styled.div`
  display: flex;
  position: relative;
  align-items: center; /* 입력 필드와 버튼을 세로로 정렬 */
  gap: 1vw;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  backdrop-filter: blur(40px);
  padding: 1vw 2vh;
  border-radius: 2vh;
  border: 1px solid #ffffff68;
  z-index: 1001;
`;

const CommentInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 2vh;
  font-weight: 400;
  color: #ffffff;
  flex: 1; /* 입력 필드가 남은 공간을 모두 차지하도록 설정 */
`;

const AddButton = styled.button`
  padding: 1vh 2vw;
  color: white;
  border-left: 1px solid #ffffff68;
  cursor: pointer;
  font-size: 2vh;
  font-weight: 700;
  width: 10%;

  &:hover {
    color: #01e086;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2vh; /* 입력 영역 바로 아래로 위치 조정 */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  padding: 3vh 1vw 1vh 1vw;
  z-index: 1000;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  padding: 1vw 2vh;
  gap: 1.5vh;
  justify-content: baseline;
  align-items: baseline;

  &:not(:last-child) {
    border-bottom: 1px solid #ffffff68; /* 구분선 추가 */
  }
`;

const ListItemHeaderOne = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vh;
  justify-content: space-between;
`;

const ListItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContaier = styled.div`
  justify-content: end;
  align-items: baseline;
  display: flex;
  flex-direction: row;
`;

const UserName = styled.span`
  font-weight: 700;
  font-size: 2vh;
  color: white;
  text-align: left;
`;

const Date = styled.span`
  font-size: 2vh;
  color: #a7a7a7;
  font-weight: 400;
  text-align: left;
`;

const Content = styled.div`
  font-size: 2vh;
  font-weight: 400;
  color: white;
  text-align: left;
  word-wrap: break-word; /* Ensures long words are wrapped */
`;

const EmptyState = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 3vh;
  font-weight: 400;
  color: #a7a7a7;
  padding: 8vw 8vh;
`;

const StyledBiDotsVerticalRounded = styled(BiDotsVerticalRounded)`
  cursor: pointer;
  font-size: 2vh;
  color: white;
  transition: color 0.3s;

  &:hover {
    color: #888;
  }
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1vh;
`;

const EditInput = styled.input`
  flex: 1;
  background: transparent;
  border: 1px solid #ffffff68;
  color: white;
  padding: 1vw 2vh;
  width: 100%;
`;

const ButtonLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vh;
  justify-content: end;
  align-items: end;
`;

const EditButton = styled.button`
  color: white;
  padding: 1vh 2vw;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid #ffffff68;
  backdrop-filter: blur(40px);
  border-radius: 5vh;

  &:hover {
    border: 1px solid #02f798;
    color: #02f798;
  }
`;

const CancelButton = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid #ffffff68;
  color: white;
  border-radius: 5vh;
  padding: 1.5vw 1vh;
  cursor: pointer;

  &:hover {
    border: 1px solid #ff6f6f;
    color: #ff6f6f;
  }
`;
