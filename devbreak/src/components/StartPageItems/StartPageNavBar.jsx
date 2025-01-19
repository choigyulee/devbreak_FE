import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import ProfileModal from "../ProfileModal"; // ProfileModal 컴포넌트
import { useAuth } from "../../context/AuthContext";
import NotificationModal from "../NotificationModal";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth()

  // 모달 상태 관리
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  // 모달 닫힘 처리를 위한 ref
  const profileModalRef = useRef(null);
  const notificationModalRef = useRef(null);

  // 모든 모달 닫기 함수
  const closeAllModals = () => {
    setProfileModalOpen(false);
    setNotificationModalOpen(false);
  };

  // 외부 클릭 감지 및 모달 상태 초기화
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target) &&
        notificationModalRef.current &&
        !notificationModalRef.current.contains(event.target)
      ) {
        closeAllModals();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 경로 변경 시 모든 모달 닫기
  useEffect(() => {
    closeAllModals();
  }, [location]);

  // 모달 토글 함수
  const toggleProfileModal = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setProfileModalOpen((prev) => {
      if (!prev) setNotificationModalOpen(false); // 다른 모달 닫기
      return !prev;
    });
  };

  const toggleNotificationModal = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setNotificationModalOpen((prev) => {
      if (!prev) setProfileModalOpen(false); // 다른 모달 닫기
      return !prev;
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    window.location.reload(); // 로그아웃 시 강제 리로드
  };


  const notifications = [
    { text: "UserName liked your Breakthrough", time: "1 min ago" },
    { text: "A new breakthrough has been posted to BlogName you follow.", time: "3 min ago" },
    { text: "A new breakthrough has been posted to BlogName you follow.", time: "10 hours ago" },
    { text: "You have been invited to BlogName", time: "1 day ago" },
    { text: "You have been invited to BlogName", time: "2 days ago" },
  ];

  return (
    <NavContainer>
      <Link to="/">
        <Logo src="/image/logo.svg" alt="logo" />
      </Link>
      {isLoggedIn ? (
        <LoggedInContainer>
          <LoggedInBtnContainer ref={notificationModalRef}>
            <StyledIoMdNotificationsOutlineContainer onClick={toggleNotificationModal}>
              <StyledIoMdNotificationsOutline active={isNotificationModalOpen} />
              {notifications.length > 0 && (
                <NotificationBadge active={isNotificationModalOpen} hasNotifications={notifications.length > 0} />
              )}
            </StyledIoMdNotificationsOutlineContainer>
            {isNotificationModalOpen && <NotificationModal notifications={notifications} />}
          </LoggedInBtnContainer>
          <LoggedInBtnContainer ref={profileModalRef}>
            <StyledHiOutlineUserCircle onClick={toggleProfileModal} active={isProfileModalOpen} />
            {isProfileModalOpen && (
              <ModalContainer>
                <ProfileModal
                  githubId="your_github_id"
                  onLogout={handleLogout}
                  onDeleteAccount={() => {
                    console.log("Account deleted");
                  }}
                />
              </ModalContainer>
            )}
          </LoggedInBtnContainer>
        </LoggedInContainer>
      ) : (
        <ButtonContainer onClick={handleLogin}>
          <Link to="/login">Login</Link>
        </ButtonContainer>
      )}
    </NavContainer>
  );
};

export default NavBar;


const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10vh 13vw;
  justify-content: space-between;
  width: 100%;
  position: relative; // NavContainer를 기준으로 ProfileModal 위치 설정
`;

const Logo = styled.img`
  height: 1.3vw;
  margin-right: 12vw;
  cursor: pointer;
`;

const LoggedInContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;

const LoggedInBtnContainer = styled.div`
  position: relative; // 상대 위치 설정
  display: flex;
  align-items: center; // 아이콘과 모달을 수직 정렬
`;

const ModalContainer = styled.div`
  position: absolute; // 절대 위치 설정
  top: 5vh; // NavBar 위쪽에 위치
  right: 0; // 아이콘과의 간격 조정
  z-index: 1000; // 다른 요소 위에 표시
`;
const StyledIoMdNotificationsOutlineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -0.3vw; // 아이콘의 상단에 위치
  right: -0.3vw; // 아이콘의 오른쪽에 위치
  width: 0.5vw; // 빨간 원의 크기
  height: 0.5vw;
  z-index: 1000;
  background-color: #ff4f4f; // 빨간색
  border-radius: 50%; // 원형으로 설정
  display: ${({ active, hasNotifications }) =>
    !active && hasNotifications ? "block" : "none"}; // active 상태가 아니고, 알림이 있을 때만 표시
`;

const StyledIoMdNotificationsOutline = styled(IoMdNotificationsOutline)`
  height: 2vw;
  width: 2vw;
  margin-left: 13vw;
  cursor: pointer;
  color: ${(props) => (props.active ? "#02f798" : "#ffffff")}; // active 상태에 따라 색상 변경
  &:hover {
    color: #02f798;
  }
`;

const StyledHiOutlineUserCircle = styled(HiOutlineUserCircle)`
  height: 2vw;
  width: 2vw;
  cursor: pointer;
  color: ${(props) => (props.active ? "#02f798" : "#ffffff")}; // active 상태에 따라 색상 변경
  &:hover {
    color: #02f798;
  }
`;

const ButtonContainer = styled.button`
  font-weight: 700;
  padding: 0.5vw 1vw;
  margin-left: 13vw;
  color: white;
  font-size: 1.3vw;
  border-radius: 3vw;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

