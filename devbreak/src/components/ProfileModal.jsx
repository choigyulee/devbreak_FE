import PropTypes from "prop-types"; // PropTypes 임포트
import styled from "@emotion/styled";
import { useRecoilState } from "recoil"; // 리코일 상태를 업데이트 하기 위한 훅
import { authState } from "../atoms/authAtoms"; // 리코일 상태 임포트

const ProfileModal = ({ githubId, onDeleteAccount }) => {
  const [auth, setAuth] = useRecoilState(authState); // 리코일 상태 가져오기 및 업데이트

  // 로그아웃 처리
  const handleLogout = () => {
    setAuth({ isLoggedIn: false }); // 로그인 상태를 false로 설정
    if (onDeleteAccount) {
      onDeleteAccount(); // 계정 삭제 함수 호출 (필요시 계정 삭제 처리)
    }
  };

  return (
    <ModalContainer>
      <DashBoard>
        <Greeting>
          <span>
            Hello!
            <img src="/image/hand.png" alt="Waving Hand" />
          </span>
        </Greeting>
        <GitHubId>GitHub ID: {githubId}</GitHubId>
        <ButtonContainer>
          <Logout onClick={handleLogout}>Logout</Logout>
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
    color: #02f798;
  }
`;

const AccountDelete = styled.button`
  color: #b0b0b0;
  cursor: pointer;
  font-size: 1vw;
  font-family: "pretendard";
  font-weight: 400;

  &:hover {
    color: red;
  }
`;

export default ProfileModal;
