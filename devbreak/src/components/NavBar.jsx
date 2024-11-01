import { Link, useLocation } from "react-router-dom"; // Link와 useLocation 임포트
import styled from "@emotion/styled";

const NavBar = () => {
  const location = useLocation(); // 현재 경로 가져오기

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
  flex-direction: row;
  padding: 3vw 13vw;
  justify-content: space-between; // 양쪽 끝으로 요소 배치
  width: 100%;
`;

const Logo = styled.img`
  height: 1.3vw; // 로고 높이
  margin-right: 12vw;
`;

const NavItems = styled.ul`
  display: flex; // Flexbox 사용
  align-items: center; // 수직 중앙 정렬
  height: 5vw; // 고정 높이 설정
  padding: 0 2vw; // 좌우 패딩 추가
  list-style: none;
  justify-content: center; // 중앙 정렬
  margin: 0;
  padding: 0;
  flex: 1; // NavItems가 가능한 공간을 차지하도록 설정
`;

const NavItem = styled.li`
  flex: 1; // 각 NavItem이 동일한 너비를 가지도록 설정
  margin: 1vw;
  font-weight: ${(props) => (props.active ? 700 : 300)}; // active prop에 따라 font-weight 설정
  color: white; // 텍스트 색상
  font-family: "Pretendard";
  cursor: pointer;
  text-align: center; // 텍스트 중앙 정렬

  a {
    text-decoration: none; // 링크의 기본 밑줄 제거
    font-size: 1.3vw;
    color: inherit; // 부모 요소의 색상 상속
  }

  &:hover {
    font-weight: 700; // 호버 시 효과
  }
`;

const LoginButton = styled.button`
  font-weight: 700;
  padding: 0.5vw 1vw;
  margin-left: 13vw;
  color: white;
  font-size: 1vw;
  border-radius: 10vw;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(40px);
  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;
