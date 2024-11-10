import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const BackToHomeBar = () => {
  return (
    <NavContainer>
      <Link to="/start">
        <Logo src="/image/logo.svg" alt="logo" />
      </Link>
      <BackToHomeBtn>
        <Link to="/home">back to home</Link>
      </BackToHomeBtn>
    </NavContainer>
  );
};

export default BackToHomeBar;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10vh 13vw;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.img`
  height: 1.3vw;
  margin-right: 12vw;
`;

const BackToHomeBtn = styled.button`
  font-weight: 700;
  padding: 0.5vw 1vw;
  margin-left: 13vw;
  color: white;
  font-size: 1.3vw;
  border-radius: 3vw;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;
