import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ContentsDeleteModal from "../ContentsDeleteModal";
import deleteArticleArticleId from "../../APIs/delete/deleteArticleArticleId";
import axios from "axios";

const EditOrDeleteModal = ({ onClose }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => {
    navigate(`/breakthrough/${articleId}/edit`);
    onClose();
  };

  const handleDeleteClick = async () => {
    try {
      // 1단계: 좋아요 상태를 false로 변경 (좋아요 취소)
      const likeResponse = await axios.put(`/api/article/${articleId}/like`, { articleId: articleId });
  
      // 2단계: likeCount를 0으로 업데이트 (response에서 받아온 값 활용)
      if (likeResponse.data && likeResponse.data.likeCount > 0) {
        // 좋아요 상태가 true였다면, likeCount를 0으로 설정
        await axios.put(`/api/article/${articleId}`, { likeCount: 0 });
      }
  
      // 3단계: article 삭제 요청
      await axios.delete(`/api/article/${articleId}`);
  
      // 삭제 후 페이지 이동 또는 알림 처리
      navigate("/blog");
    } catch (error) {
      console.error("삭제 중 오류가 발생했습니다:", error);
      // 에러 처리
      alert("삭제를 완료할 수 없습니다.");
    }
  };
  

  const handleDeleteConfirm = async () => {
    try {
      await deleteArticleArticleId(articleId);
      alert('글이 삭제되었습니다.');
      onClose();
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
      {showDeleteModal && (
        <ContentsDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Overlay>
  );
};

EditOrDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
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
