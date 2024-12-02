import styled from "@emotion/styled";
import PropTypes from "prop-types";

function CommentModal({ onClose, commentId, onEdit, onDelete }) {
  const handleEditClick = () => {
    onEdit(commentId); // 수정 동작 전달
    onClose(); // 모달 닫기
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      onDelete(commentId); // 삭제 동작 전달
      onClose(); // 모달 닫기
    }
  };

  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Button variant="edit" onClick={handleEditClick}>
          Edit
        </Button>
        |
        <Button variant="delete" onClick={handleDeleteClick}>
          Delete
        </Button>
      </ModalContainer>
    </Overlay>
  );
}

CommentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  commentId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired, // 새로운 prop 추가
  onDelete: PropTypes.func.isRequired, // 새로운 prop 추가
};

export default CommentModal;

// Styled Components

const Overlay = styled.div`
  margin-left: 5vw;
  position: absolute;
  z-index: 1002;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  align-items: center;
  font-size: 2vh;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  border-radius: 1vh;
  display: flex;
  flex-direction: row;
  gap: 1vh;
`;

const Button = styled.button`
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1.5vh;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: ${(props) => (props.variant === "edit" ? "#02f798" : props.variant === "delete" ? "#ff4f4f" : "#ffffff")};
  }
`;
