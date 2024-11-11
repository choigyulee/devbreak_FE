import PropTypes from "prop-types"; // PropTypes 임포트
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import AccountDeleteModal from "./AccountDeleteModal"; // 새로 추가할 모달 컴포넌트

const NavBar = ({ isLoggedIn }) => {
  const location = useLocation();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setAccountDeleteModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleAccountDelete = () => {
    setProfileModalOpen(false); // ProfileModal 닫기
    setAccountDeleteModalOpen(true); // AccountDeleteModal 열기
  };

  const closeAccountDeleteModal = () => {
    setAccountDeleteModalOpen(false); // AccountDeleteModal 닫기
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
        <NavItem active={location.pathname.startsWith("/workspace")}>
          <Link to="/workspace">Workspace</Link>
        </NavItem>
      </NavItems>
      {isLoggedIn ? (
        <ProfileContainer>
          <StyledHiOutlineUserCircle onClick={toggleProfileModal} active={isProfileModalOpen} />
          {isProfileModalOpen && (
            <ProfileModalContainer>
              <ProfileModal
                githubId="your_github_id" // 실제 GitHub ID로 변경
                onLogout={() => console.log("Logged out")} // 로그아웃 로직 추가
                onDeleteAccount={handleAccountDelete} // 계정 삭제 핸들러
              />
            </ProfileModalContainer>
          )}
          {isAccountDeleteModalOpen && <AccountDeleteModal onClose={closeAccountDeleteModal} />}
        </ProfileContainer>
      ) : (
        <LoginButton>
          <Link to="/login">Login</Link>
        </LoginButton>
      )}
    </NavContainer>
  );
};

// PropTypes 정의
NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn은 필수 boolean 타입
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

const LoginButton = styled.button`
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
