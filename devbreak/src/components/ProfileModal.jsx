import PropTypes from "prop-types"; // PropTypes 임포트
import styled from "@emotion/styled";

const ProfileModal = ({ githubId, onLogout, onDeleteAccount }) => {
  return (
    <ModalContainer>
      <DashBoard>
        <Greeting>
          <span>
            Hello!
            <img src="/image/hand.png" alt="Waving Hand" />
          </span>
        </Greeting>
        <GitHubId>Gitbub ID{githubId}</GitHubId>
        <ButtonContainer>
          <Logout onClick={onLogout}>Logout</Logout>
          <Divider />
          <AccountDelete onClick={onDeleteAccount}>Account Delete</AccountDelete>
        </ButtonContainer>
      </DashBoard>
    </ModalContainer>
  );
};

// PropTypes 정의
ProfileModal.propTypes = {
  githubId: PropTypes.string.isRequired, // GitHub ID는 필수 문자열
  onLogout: PropTypes.func.isRequired, // 로그아웃 함수는 필수 함수
  onDeleteAccount: PropTypes.func.isRequired, // 계정 삭제 함수는 필수 함수
};

const ModalContainer = styled.div`
  z-index: 1000; // 모달이 다른 요소 위에 나타나도록 설정
  justify-content: end;
  align-items: end;
`;

const DashBoard = styled.div`
  box-sizing: border-box;
  align-items: center;
  padding: 4vh 1vh;
  width: 11vw; // 너비 조정
  gap: 1.5vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #02f798;
  backdrop-filter: blur(40px);
  border-radius: 18px;
  text-align: center; // 텍스트 중앙 정렬
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vh;
  color: #ffffff;
  font-size: 2vh;
  font-family: "pretendard";
  font-weight: 300;
  margin-bottom: -0.5vh;
  span {
    font-size: 1vw;
    font-family: "pretendard";
    font-weight: 700;
  }
  img {
    height: 2vh; // 손을 흔드는 이미지 크기를 1vh로 조정
    margin-left: 1vh;
  }
`;

const GitHubId = styled.div`
  color: white;
  font-size: 1vw;
  font-family: "pretendard";
  font-weight: 700;
`;

const Divider = styled.hr`
  border: 0.1vh solid rgba(255, 255, 255, 0.5);
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logout = styled.button`
  color: white;
  cursor: pointer;
  font-size: 1vw;
  font-family: "pretendard";
  font-weight: 400;

  &:hover {
    // 여기에 hover 스타일 추가 가능
  }
`;

const AccountDelete = styled.button`
  color: #b0b0b0;
  cursor: pointer;
  font-size: 1vw;
  font-family: "pretendard";
  font-weight: 400;

  &:hover {
    // 여기에 hover 스타일 추가 가능
  }
`;

export default ProfileModal;
