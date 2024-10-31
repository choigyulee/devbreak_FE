import styled from "@emotion/styled";

const NavBar = () => {
  return (
    <NavContainer>
      <Logo src="/image/logo.svg" alt="logo" />
      <NavItems>
        <NavItem>Home</NavItem>
        <NavItem>Brekthrough</NavItem>
        <NavItem>Workspace</NavItem>
      </NavItems>
      <SignUpButton>sign up</SignUpButton>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
`;

const Logo = styled.img`
  height: 40px; // 로고 높이
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 30px;
  font-weight: 300;
  font-family: "Pretendard";
  color: white; // 텍스트 색상
  cursor: pointer;

  &:hover {
    font-weight: 700; // 호버 시 효과
  }
`;

const SignUpButton = styled.button`
  font-weight: 700;
  font-size: 1vh;
  padding: 1vh;

  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
`;
