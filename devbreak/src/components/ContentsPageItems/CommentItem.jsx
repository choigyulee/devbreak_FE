import { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

function CommentItem({ comments, onAddComment, isLoggedIn }) {
  const [newComment, setNewComment] = useState("");

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

    // 부모 컴포넌트로 댓글 데이터 전달
    onAddComment(newComment);
    setNewComment(""); // 입력란 초기화
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
                <UserName>{comment.userName}</UserName>
                <Date>{comment.date}</Date>
              </ListItemHeader>
              <Content>{comment.content}</Content>
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
    })
  ).isRequired,
  onAddComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired, // 로그인 상태 추가
};

export default CommentItem;

// Styled Components

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2vh;
  width: 100%;
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
  position: absolute;
  flex-direction: column;
  top: -2vh;
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

const ListItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vh;
  justify-content: space-between;
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
`;

const EmptyState = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.6vh;
  font-weight: 400;
  color: #a7a7a7;
  padding: 8vw 8vh;
`;
