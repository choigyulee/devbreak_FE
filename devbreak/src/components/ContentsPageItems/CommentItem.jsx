/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CommentModal from "./CommentModal";
import putCommentCommentId from "../../APIs/put/putCommentCommentId";
import deleteCommentArticleIdCommentId from "../../APIs/delete/deleteCommentArticleIdCommentId";
import { FaRegCommentDots } from "react-icons/fa";

function CommentItem({ comments, onAddComment, onEditComment, onDeleteComment, isLoggedIn, articleId }) {
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null); // 현재 선택된 댓글 ID
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 수정 중인 댓글 내용

  const handleInputChange = (e) => {
    if (!isLoggedIn) {
      alert("Login is required to access this service!\nPlease log in to continue.");
      navigate("/login");
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
    if (editingCommentId !== null) {
      // 수정 중이라면 모달을 열지 못하게 함
      return;
    }

    if (isModalOpen && selectedCommentId === commentId) {
      // 이미 열려있는 모달을 닫음
      closeModal();
    } else {
      // 다른 모달을 염
      setIsModalOpen(false); // 현재 모달을 닫음
      setSelectedCommentId(commentId); // 새로운 모달의 ID로 설정
      setIsModalOpen(true); // 새로운 모달 열기
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCommentId(null);
  };

  const startEditing = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
    closeModal(); // 수정 시작 시 모달을 닫음
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

    // 댓글 수정 API 호출
    try {
      await putCommentCommentId(editingCommentId, articleId, editingContent);
      alert("Comment updated successfully.");
      onEditComment(editingCommentId, editingContent); // 부모에게 수정된 댓글 정보 전달
      cancelEditing();
    } catch (error) {
      alert("Failed to update comment.");
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      // 댓글 삭제 API 호출
      await deleteCommentArticleIdCommentId(articleId, commentId);
      alert("Comment deleted successfully.");
      onDeleteComment(commentId); // 부모에게 삭제된 댓글 정보 전달
    } catch (error) {
      alert("Failed to delete comment.");
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
          <EmptyState>
            <StyledFaRegCommentDots />
            There is no Comment!
          </EmptyState>
        ) : (
          comments.map((comment) => (
            <ListItem key={comment.commentId}>
              <ListItemHeader>
                <ListItemHeaderOne>
                  <UserName>{comment.userName}</UserName>
                  <Date>{comment.date}</Date>
                </ListItemHeaderOne>
                {(comment.updateButton || comment.deleteButton) && (
                  <ButtonContainer>
                    <StyledBiDotsVerticalRounded onClick={() => handleMenuClick(comment.commentId)} />
                    {isModalOpen && selectedCommentId === comment.commentId && (
                      <CommentModal
                        onClose={closeModal}
                        commentId={selectedCommentId}
                        onEdit={() => startEditing(comment.commentId, comment.content)}
                        onDelete={() => deleteCommentHandler(comment.commentId)} // 삭제 함수에 articleId, commentId 전달
                      />
                    )}
                  </ButtonContainer>
                )}
              </ListItemHeader>
              {editingCommentId === comment.commentId ? (
                <EditArea>
                  <EditInput value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
                  <ButtonLine>
                    <CancelButton onClick={cancelEditing}>Cancel</CancelButton>
                    <EditButton onClick={saveEdit}>Edit</EditButton>
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
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  articleId: PropTypes.number.isRequired,
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
  margin-top: 1vh;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  padding: 1vh 1vw 3vh 1vw;
  border-radius: 3vh;
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

const ButtonContainer = styled.div`
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
  word-wrap: break-word; /* Ensures long words break into the next line */
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1vh;
`;

const EditInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 2vh;
  font-weight: 400;
  color: white;
  border: 1px solid #ffffff68;
  padding: 1vh;
  border-radius: 1vh;
`;

const ButtonLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  justify-content: end;
  align-items: end;
`;

const EditButton = styled.button`
  font-size: 2vh;
  font-weight: 700;
  color: white;
  cursor: pointer;
  padding: 0.5vh 0;

  &:hover {
    color: #01e086;
  }
`;

const CancelButton = styled.button`
  font-size: 2vh;
  font-weight: 700;
  color: #a7a7a7;
  cursor: pointer;
  padding: 0.5vh 0;

  &:hover {
    color: white;
  }
`;

const EmptyState = styled.div`
  color: #ffffff85;
  font-size: 3vh;
  padding: 3vw 5vh;
  font-weight: 700;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const StyledBiDotsVerticalRounded = styled(BiDotsVerticalRounded)`
  font-size: 2.5vh;
  color: #ffffff;
  cursor: pointer;
`;

const StyledFaRegCommentDots = styled(FaRegCommentDots)`
  font-size: 5vh;
  color: #ffffff85;
`;
