import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ContentsDeleteModal from "./ContentsDeleteModal";

const EditOrDeleteModal = ({ blogId, articleId, onClose }) => {
  const navigate = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleEditClick = () => {
    navigate(`/breakthrough/${articleId}/edit`);
    onClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      {isDeleteModalVisible && (
        <ContentsDeleteModal
          blogId={blogId}
          articleId={articleId}
          onClose={handleCloseDeleteModal}
          onConfirm={onClose} // 최상위 모달 닫기
        />
      )}
      <Overlay onClick={onClose} onConfirm={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <Button variant="edit" onClick={handleEditClick}>
            Edit
          </Button>
          <ButtonDivider />
          <Button variant="delete" onClick={handleDeleteClick}>
            Delete
          </Button>
        </ModalContainer>
      </Overlay>
    </>
  );
};

EditOrDeleteModal.propTypes = {
  blogId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditOrDeleteModal;

const Overlay = styled.div`
  margin-right: 3vh;
  position: absolute;
  z-index: 1000;
`;

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
