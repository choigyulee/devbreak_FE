// src/components/NavBar.js
import PropTypes from "prop-types"; // PropTypes 임포트
import { Link, useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import LoginButton from "./LoginPageItems/LoginButton";
// import { useAuth } from "../context/AuthContext"; // useAuth 훅 임포트
import { useRecoilValue } from "recoil"; // 리코일 상태 값을 가져오기 위한 훅
import { authState } from "../atoms/authAtoms"; // 리코일 상태 임포트

const NavBar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  // 리코일을 사용하여 로그인 상태를 가져옴
  const { isLoggedIn } = useRecoilValue(authState); // useRecoilValue를 사용하여 상태 가져오기


  // 페이지가 변경될 때마다 로그인 상태를 콘솔에 찍기
  useEffect(() => {
    console.log("Current Path:", location.pathname); // 현재 페이지 경로 출력
    console.log("Is Logged In:", isLoggedIn); // 로그인 상태 출력
  }, [location, isLoggedIn]); 

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleWorkspaceClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다!\n로그인 후 이용 부탁드립니다.");
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <NavContainer>
      <Link to="/start">
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
        <ProfileContainer>
          <StyledHiOutlineUserCircle onClick={toggleProfileModal} active={isProfileModalOpen} />
          {isProfileModalOpen && (
            <ProfileModalContainer>
              <ProfileModal
                githubId="your_github_id" // GitHub ID를 적절히 설정
                onLogout={() => {
                  onLogout(); // 부모 컴포넌트의 로그아웃 함수 호출
                  setProfileModalOpen(false); // 모달 닫기
                }}
                onDeleteAccount={() => {
                  // 계정 삭제 처리 로직
                  console.log("Account deleted");
                }}
              />
            </ProfileModalContainer>
          )}
        </ProfileContainer>
      ) : (
        <LoginButton /> // 로그인하지 않은 경우 LoginButton 컴포넌트 렌더링
      )}
    </NavContainer>
  );
};

NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired, // onLogout prop 추가
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
