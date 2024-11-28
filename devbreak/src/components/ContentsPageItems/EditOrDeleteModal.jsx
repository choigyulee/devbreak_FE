import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ContentsDeleteModal from "../ContentsDeleteModal";
import deleteArticleArticleId from "../../APIs/delete/deleteArticleArticleId";

const EditOrDeleteModal = ({ onClose }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => {
    navigate(`/breakthrough/${articleId}/edit`);
    onClose();
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // 모달 표시
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteArticleArticleId(articleId); // API 호출하여 글 삭제
      alert('글이 삭제되었습니다.');
      onClose(); // 삭제 후 모달 닫기
    } catch (error) {
      alert('글 삭제에 실패했습니다.');
    }
  };
  

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Button variant="edit" onClick={handleEditClick}>Edit</Button>
        <ButtonDivider />
        <Button variant="delete" onClick={handleDeleteClick}>Delete</Button>
      </ModalContainer>

      {/* Delete Modal이 표시될 때만 ContentsDeleteModal 컴포넌트를 렌더링 */}
      {showDeleteModal && (
        <ContentsDeleteModal
          onClose={() => setShowDeleteModal(false)} // Cancel 버튼 클릭 시 모달 닫기
          onConfirm={handleDeleteConfirm} // Delete 버튼 클릭 시 삭제 실행
        />
      )}
    </Overlay>
  );
};

// PropTypes로 프롭 검증
EditOrDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose는 함수이며 필수입니다.
};

export default EditOrDeleteModal;

const Overlay = styled.div`
  position: fixed;
  margin-right: 4vh;
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
    color: ${(props) =>
      props.variant === "edit" ? "#02f798" : props.variant === "delete" ? "#ff4f4f" : "#ffffff"};
  }
`;

const ButtonDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
`;
