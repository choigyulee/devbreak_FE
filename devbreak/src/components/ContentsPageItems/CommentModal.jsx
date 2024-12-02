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
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <Button variant="edit" onClick={handleEditClick}>
        Edit
      </Button>
      <ButtonDivider />
      <Button variant="delete" onClick={handleDeleteClick}>
        Delete
      </Button>
    </ModalContainer>
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

const ModalContainer = styled.div`
  box-sizing: border-box;
  align-items: center;
  padding: 2vh;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  z-index: 1001;
`;

const Button = styled.button`
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 2vh;
  cursor: pointer;
  width: 100%;

  &:hover {
    color: ${(props) => (props.variant === "edit" ? "#02f798" : props.variant === "delete" ? "#ff4f4f" : "#ffffff")};
  }
`;

const ButtonDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
`;
