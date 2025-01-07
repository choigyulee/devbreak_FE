import { Link, useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "@emotion/styled";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal"; // ProfileModal 컴포넌트
import NotificationModal from "./NotificationModal";
// import Cookies from "js-cookie";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 상태를 임시로 항상 true로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 항상 로그인 상태로 가정

  const handleLogout = () => {
    console.log("Logout function triggered"); // 로그아웃 기능 테스트 용도
    setIsLoggedIn(false);
  };

  // // 쿠키 보고 로그인 상태 초기화
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   const storedAccessToken = Cookies.get("accessToken");
  //   const storedRefreshToken = Cookies.get("refreshToken");
  //   return !!storedAccessToken && !!storedRefreshToken;
  // });

  // useEffect(() => {
  //   // 로그인 상태 확인 (쿠키에서 토큰 존재 여부로 판단)
  //   const storedAccessToken = Cookies.get("accessToken");
  //   const storedRefreshToken = Cookies.get("refreshToken");
  //   const currentLoginStatus = !!storedAccessToken && !!storedRefreshToken;

  //   // 현재 로그인 상태와 기존 상태가 다르면 상태 업데이트
  //   if (currentLoginStatus !== isLoggedIn) {
  //     setIsLoggedIn(currentLoginStatus);
  //   }
  // }, [location, isLoggedIn]);

  //   const handleLogout = () => {
  //   // 로그아웃 시 모든 토큰 제거
  //   Cookies.remove("accessToken");
  //   Cookies.remove("refreshToken");
  //   Cookies.remove("isLoggedIn");

  //   // 강제 리로드 설정
  //   Cookies.set("forceReload", "true");

  //   setIsLoggedIn(false);
  //   window.location.reload(); // 로그아웃 시 강제 리로드
  // };

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev); // 프로필 모달 토글
  };

  const handleWorkspaceClick = () => {
    if (!isLoggedIn) {
      alert("Login is required to access this service!\nPlease log in to continue.");
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  const handleLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const toggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
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
      <NavItems>
        <NavItem active={location.pathname.startsWith("/home")}>
          <Link to="/home">Home</Link>
        </NavItem>
        <NavItem active={location.pathname.startsWith("/breakthrough")}>
          <Link to="/breakthrough">Breakthrough</Link>
        </NavItem>
        <NavItem active={location.pathname.startsWith("/workspace")} onClick={handleWorkspaceClick}>
          <Link to="/workspace">Workspace</Link>
        </NavItem>
      </NavItems>
      {isLoggedIn ? (
        <LoggedInContainer>
          <LoggedInBtnContainer>
            <StyledIoMdNotificationsOutlineContainer onClick={toggleNotificationModal}>
              <StyledIoMdNotificationsOutline active={isNotificationModalOpen} />
              {notifications.length > 0 && (
                <NotificationBadge active={isNotificationModalOpen} hasNotifications={notifications.length > 0} />
              )}
            </StyledIoMdNotificationsOutlineContainer>
            {isNotificationModalOpen && <NotificationModal notifications={notifications} />}
          </LoggedInBtnContainer>
          <LoggedInBtnContainer>
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

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  justify-content: center;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
  font-weight: ${(props) => (props.active ? 700 : 300)};
  color: white;
  font-family: "Pretendard";
  cursor: pointer;

  a {
    text-decoration: none;
    font-size: 1.5vw;
    color: inherit;
    display: block;
    padding: 1rem;
  }

  &:hover {
    font-weight: 700;
  }
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
