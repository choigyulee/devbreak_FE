import styled from "@emotion/styled";
import { IoIosWarning } from "react-icons/io";
import PropTypes from "prop-types";

const ContentsDeleteModal = ({ onClose, onConfirm }) => {
  const handleDelete = async () => {
    try {
      await onConfirm(); 
      onClose(); // 삭제 후 모달 닫기
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <StyledIoIosWarning />
        <Message>
          <Line>Are you sure you want</Line>
          <Line>to delete this breakthrough?</Line>
        </Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>No</CancelButton>
          <ConfirmButton onClick={handleDelete}>Yes</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

// PropTypes 유효성 검사
ContentsDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ContentsDeleteModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #ff6060;
  backdrop-filter: blur(40px);
  border-radius: 18px;
  gap: 2vh;
  text-align: center;
`;

const StyledIoIosWarning = styled(IoIosWarning)`
  color: #ff6060;
  width: 8vh;
  height: 8vh;
  margin-bottom: -1vh;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const Line = styled.p`
  color: #ff6060;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vh;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmButton = styled.button`
  color: #ff4f4f;
  font-size: 1.3rem;
  padding: 0.5rem 2rem;
  font-weight: 500;
  font-family: "pretendard";
  border: 1px solid #ff4f4f;
  cursor: pointer;
  background: linear-gradient(122.72deg, rgba(79, 79, 79, 0.1) 1.74%, rgba(79, 79, 79, 0.1) 1.75%, rgba(255, 255, 255, 0.1) 33.05%, rgba(79, 79, 79, 0.1) 97.16%);
  border-radius: 3vh;
`;

const CancelButton = styled.button`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 1.3rem;
  font-weight: 500;
  font-family: "pretendard";
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: linear-gradient(122.72deg, rgba(79, 79, 79, 0.1) 1.74%, rgba(79, 79, 79, 0.1) 1.75%, rgba(255, 255, 255, 0.1) 33.05%, rgba(79, 79, 79, 0.1) 97.16%);
  border-radius: 3vh;
`;
