import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const NavBar = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Logo src="/image/logo.svg" alt="logo" />
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
      <LoginButton>
        <Link to="/login">Login</Link>
      </LoginButton>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 3vw 13vw;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.img`
  height: 1.3vw;
  margin-right: 12vw;
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  justify-content: center; // 중앙 정렬
`;

const NavItem = styled.li`
  flex: 1; // 각 NavItem이 동일한 비율로 공간을 차지하도록 설정
  text-align: center; // 텍스트 중앙 정렬
  font-weight: ${(props) => (props.active ? 700 : 300)};
  color: white;
  font-family: "Pretendard";
  cursor: pointer;

  a {
    text-decoration: none;
    font-size: 1.3vw;
    color: inherit;
    display: block;
    padding: 1rem; // 패딩을 사용하여 클릭 영역 확대
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
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;
