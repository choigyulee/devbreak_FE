import { Link, useLocation } from "react-router-dom"; // Link와 useLocation 임포트
import styled from "@emotion/styled";

const NavBar = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <NavContainer>
      <Logo src="/image/logo.svg" alt="logo" />
      <NavItems>
        <NavItem active={location.pathname.startsWith("/home")}>
          <Link to="/">Home</Link>
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
  flex-direction: row;
<<<<<<< HEAD
  padding: 3vw 13vw;
  justify-content: space-between; // 양쪽 끝으로 요소 배치
  width: 100%;
`;

const Logo = styled.img`
  height: 1.3vw; // 로고 높이
  margin-right: 12vw;
=======
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 2rem; // 로고 높이
>>>>>>> cad2256ea84407ec9d5f36475c789358ed13f572
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
<<<<<<< HEAD
  justify-content: center; // 중앙 정렬
=======
  gap: 5rem;
  justify-content: space-between;
>>>>>>> cad2256ea84407ec9d5f36475c789358ed13f572
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 1rem;
  font-weight: ${(props) => (props.active ? 700 : 300)}; // active prop에 따라 font-weight 설정
  color: white; // 텍스트 색상
  font-family: "Pretendard";
  cursor: pointer;

  a {
    text-decoration: none; // 링크의 기본 밑줄 제거
<<<<<<< HEAD
    font-size: 1.3vw;
=======
    font-size: 1.5rem;
>>>>>>> cad2256ea84407ec9d5f36475c789358ed13f572
    color: inherit; // 부모 요소의 색상 상속
  }

  &:hover {
    font-weight: 700; // 호버 시 효과
  }
`;

const LoginButton = styled.button`
  font-weight: 700;
<<<<<<< HEAD
  padding: 0.5vw 1vw;
  margin-left: 13vw;
=======
  padding: 0.5rem 1rem;
>>>>>>> cad2256ea84407ec9d5f36475c789358ed13f572
  color: white;
  font-size: 1rem;
  border-radius: 30rem;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;
