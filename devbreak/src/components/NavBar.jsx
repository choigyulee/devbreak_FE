import { Link, useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal"; // ProfileModal 컴포넌트
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 로컬 상태로 관리
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // 프로필 모달 상태

  useEffect(() => {
    // URL에서 토큰 파라미터 추출
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    // URL에 토큰이 있으면 세션 스토리지에 저장
    if (accessToken && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('isLoggedIn', 'true');

      // 토큰을 저장한 후 URL 파라미터 제거
      navigate('/', { replace: true });
    }

    // 로그인 상태 확인 (토큰 존재 여부로 판단)
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedRefreshToken = sessionStorage.getItem('refreshToken');
    setIsLoggedIn(!!storedAccessToken && !!storedRefreshToken);
  }, [location, navigate]);

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    console.log("Is Logged In:", isLoggedIn);
    console.log("Access Token:", sessionStorage.getItem('accessToken'));
    console.log("Refresh Token:", sessionStorage.getItem('refreshToken'));
  }, [location, isLoggedIn]);

  const handleLogout = () => {
    // 로그아웃 시 모든 토큰 제거
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

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


  return (
    <NavContainer>
      <Link to="/start">
        <Logo src="/image/logo.svg" alt="logo" />
      </Link>
      <NavItems>
        <NavItem active={location.pathname.startsWith("/")}>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem active={location.pathname.startsWith("/breakthrough")}>
          <Link to="/breakthrough">Breakthrough</Link>
        </NavItem>
        <NavItem active={location.pathname.startsWith("/workspace")} onClick={handleWorkspaceClick}>
          <Link to="/workspace">Workspace</Link>
        </NavItem>
      </NavItems>
      {isLoggedIn ? (
        <ProfileContainer>
          <StyledHiOutlineUserCircle onClick={toggleProfileModal} active={isProfileModalOpen} />
          {isProfileModalOpen && (
            <ProfileModalContainer>
              <ProfileModal
                githubId="your_github_id"
                onLogout={handleLogout}
                onDeleteAccount={() => {
                  console.log("Account deleted");
                }}
              />
            </ProfileModalContainer>
          )}
        </ProfileContainer>
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
    font-size: 1.3vw;
    color: inherit;
    display: block;
    padding: 1rem;
  }

  &:hover {
    font-weight: 700;
  }
`;

const ProfileContainer = styled.div`
  position: relative; // 상대 위치 설정
  display: flex;
  align-items: center; // 아이콘과 모달을 수직 정렬
`;

const ProfileModalContainer = styled.div`
  position: absolute; // 절대 위치 설정
  top: 5vh; // NavBar 위쪽에 위치
  right: 0; // 아이콘과의 간격 조정
  z-index: 1000; // 다른 요소 위에 표시
`;

const StyledHiOutlineUserCircle = styled(HiOutlineUserCircle)`
  height: 2vw;
  width: 2vw;
  margin-left: 13vw;
  cursor: pointer;
  color: ${(props) => (props.active ? "#02f798" : "#ffffff")}; // active 상태에 따라 색상 변경
  &:hover {
    color: #02f798;
  }
`;

const LoginButton = styled.button`
  font-weight: 700;
  padding: 0.5vw 1.7vw;
  margin-left: 9vw;
  color: white;
  font-size: 1.5vw;
  border-radius: 3vw;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
  a {
    text-decoration: none;
    color: inherit; // 버튼의 색상과 동일하게 유지
    font-size: 1.3vw; // 로그인 텍스트의 크기를 조정
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
