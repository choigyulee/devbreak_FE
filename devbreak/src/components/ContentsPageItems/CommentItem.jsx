import { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types"; // prop-types 패키지 임포트

function CommentItem({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
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
        <SendButton onClick={handleSendClick}>Send</SendButton>
      </InputArea>
      <ListContainer>
        {comments.map((comment) => (
          <ListItem key={comment.commentId}>
            <ListItemHeader>
              <UserName>{comment.userName}</UserName>
              <Date>{comment.date}</Date>
            </ListItemHeader>
            <Content>{comment.content}</Content>
          </ListItem>
        ))}
      </ListContainer>
    </CommentContainer>
  );
}

CommentItem.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.number.isRequired, // 댓글 ID
      userName: PropTypes.string.isRequired, // 사용자 이름
      date: PropTypes.string.isRequired, // 작성 날짜
      content: PropTypes.string.isRequired, // 댓글 내용
    })
  ).isRequired,
  onAddComment: PropTypes.func.isRequired, // 댓글 추가 함수
};

export default CommentItem;

// Styled Components

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  padding: 2vh;
  border-radius: 2vh;
  width: 100%;
`;

const InputArea = styled.div`
  display: flex;
  gap: 1vw;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 1vh;
  font-size: 1.5vh;
`;

const SendButton = styled.button`
  padding: 1vh 2vw;
  color: white;
  border: none;
  border-radius: 0.5vh;
  cursor: pointer;
  font-size: 1.5vh;

  &:hover {
    color: #01e086;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px);
  padding: 1vh;
  border-radius: 1vh;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  padding: 1.5vh;
  border-radius: 1vh;
`;

const ListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;
`;

const UserName = styled.span`
  font-weight: 700;
  font-size: 1.8vh;
  color: white;
`;

const Date = styled.span`
  font-size: 1.4vh;
  color: #a7a7a7;
`;

const Content = styled.div`
  font-size: 1.6vh;
  font-weight: 400;
  color: white;
`;
