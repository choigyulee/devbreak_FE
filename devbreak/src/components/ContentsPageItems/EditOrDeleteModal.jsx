import styled from "@emotion/styled";
import PropTypes from "prop-types"; // PropTypes 임포트

const EditOrDeleteModal = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Button variant="edit">Edit</Button>
        <ButtonDivider />
        <Button variant="delete">Delete</Button>
      </ModalContainer>
    </Overlay>
  );
};

// PropTypes로 프롭 검증
EditOrDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose는 함수이며 필수입니다.
};

export default EditOrDeleteModal;

const Overlay = styled.div`
  position: fixed; /* 화면 전체를 덮기 위한 고정 위치 */
  margin-right: 4vh;
  z-index: 1000; /* 모달이 다른 콘텐츠 위에 오도록 설정 */
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
  gap: 1vh; /* 버튼 간의 여백을 더 추가 */
`;

const Button = styled.button`
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 2vh;
  cursor: pointer;
  width: 100%; /* 버튼을 전체 너비로 확장 */

  &:hover {
    color: ${(props) => (props.variant === "edit" ? "#02f798" : props.variant === "delete" ? "#ff4f4f" : "#ffffff")};
  }
`;

const ButtonDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3); /* 버튼 사이의 구분선 색상 */
  width: 100%; /* 구분선이 버튼 전체 너비를 차지하도록 */
`;
