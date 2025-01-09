import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import getAuthInfo from "../APIs/get/getAuthInfo";
import postAuthLogout from "../APIs/post/postAuthLogout";
import deleteAuthDeleteAccount from "../APIs/delete/deleteAuthDeleteAccount";
import AccountDeleteModal from "./AccountDeleteModal";
import { Cookies } from 'react-cookie';

const ProfileModal = ({ onLogout }) => {
  const [githubId, setGithubId] = useState("");  // githubId 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태를 관리하는 로컬 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 컴포넌트가 마운트될 때 API 호출하여 githubId 가져오기
  useEffect(() => {
    const fetchGithubId = async () => {
      try {
        const data = await getAuthInfo();  // API 호출
        setGithubId(data.userName);  // API 응답에서 githubId를 상태에 저장
        console.log('userName:', data.userName);
      } catch (error) {
        console.error("GitHub ID를 가져오는 중 오류 발생:", error);
      }
    };
    if (isLoggedIn) {
      fetchGithubId();
    }
    fetchGithubId();
  }, [isLoggedIn]);

  // 로그아웃 처리
  const handleLogout = async () => {
    const cookies = new Cookies();

    try {
      // API로 로그아웃 요청
      await postAuthLogout();

      cookies.remove("accessToken", { path: "/" });
      cookies.remove("refreshToken", { path: "/" });

      setIsLoggedIn(false);
      onLogout(); // 부모 컴포넌트에서 전달된 로그아웃 함수 호출
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  // 계정 삭제 처리
  const handleAccountDelete = async () => {
    setShowDeleteModal(true); // 계정 삭제 모달 표시
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAuthDeleteAccount();
      setShowDeleteModal(false);
      // 계정 삭제 후 로그아웃 처리
      handleLogout();
    } catch (error) {
      console.error("계정 삭제 중 오류가 발생했습니다:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <ModalContainer>
        <DashBoard>
          <Greeting>
            <span>
              Hello!
              <img src="/image/hand.png" alt="Waving Hand" />
            </span>
          </Greeting>
          <GitHubId>{githubId}</GitHubId>
          <ButtonContainer>
            <Logout onClick={handleLogout}>Logout</Logout>
            <Divider />
            <AccountDelete onClick={handleAccountDelete}>Account Delete</AccountDelete>
          </ButtonContainer>
        </DashBoard>
      </ModalContainer>

      {showDeleteModal && (
        <AccountDeleteModal
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )
      }
    </>
  );
};

// PropTypes 정의
ProfileModal.propTypes = {
  onLogout: PropTypes.func.isRequired, // 로그아웃 함수는 필수 함수
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
  color: #02f798;
  font-size: 1.3vw;
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
