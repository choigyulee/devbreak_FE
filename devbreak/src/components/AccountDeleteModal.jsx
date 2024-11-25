import styled from "@emotion/styled";
import { IoIosWarning } from "react-icons/io";
import PropTypes from "prop-types"; // PropTypes를 사용하여 prop 유효성 검사

const AccountDeleteModal = ({ onClose, onConfirm }) => {
  const handleDelete = async () => {
    await onConfirm(); // 계정 삭제 실행
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <StyledIoIosWarning />
        <Message>
          <Line>Are you sure you want</Line>
          <Line>to delete your account?</Line>
        </Message>
        <Message>
          <Script>Are you sure you want</Script>
          <Script>to delete your account?</Script>
        </Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>No, I want to use this account.</CancelButton>
          <ConfirmButton onClick={handleDelete}>Yes, I want to delete this account.</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

// PropTypes를 사용하여 prop의 유효성 검사 추가
AccountDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose는 필수 prop
};

const ModalOverlay = styled.div`
  position: fixed; /* 고정 위치 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  z-index: 1001; /* 다른 요소 위에 표시 */
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* 아이콘과 텍스트 중앙 정렬 */
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #ff6060;
  backdrop-filter: blur(40px);
  border-radius: 18px;
  gap: 2vh;
  text-align: center; /* 텍스트 중앙 정렬 */
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
  color: #ff6060; /* 텍스트 색상 */
  font-size: 1.5rem; /* 텍스트 크기 */
  font-weight: 700;
`;

const Script = styled.p`
  color: #ffffff; /* 텍스트 색상 */
  font-size: 1.3rem; /* 텍스트 크기 */
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  justify-content: space-around; /* 버튼 간격 조정 */
  width: 100%; /* 버튼 컨테이너 너비 */
`;

const ConfirmButton = styled.button`
  color: #ff4f4f;
  font-size: 1.3rem;
  padding: 0.5rem 2rem;
  font-weight: 500;
  font-family: "pretendard";
  border: 1px solid #ff4f4f;
  cursor: pointer; /* button */
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  border: 1px solid #ff4f4f;
  border-radius: 3vh;
`;

const CancelButton = styled.button`
  color: white; /* button */
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 1.3rem;
  font-weight: 500;
  font-family: "pretendard";
  padding: 0.5rem 1rem;
  border: 1px solid;
  cursor: pointer;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  border-radius: 3vh;
`;

export default AccountDeleteModal;
