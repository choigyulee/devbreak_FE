// NavBar.jsx
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

const NavBar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev);
  };

  const handleWorkspaceClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다!\n로그인 후 이용 부탁드립니다.");
      navigate("/login");
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
                githubId="your_github_id" 
                onLogout={() => {
                  onLogout(); 
                  setProfileModalOpen(false); 
                }}
              />
            </ProfileModalContainer>
          )}
        </ProfileContainer>
      ) : (
        <LoginButton>
          <Link to="/login">Login</Link>
        </LoginButton>
      )}
    </NavContainer>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired, 
};

export default NavBar;
