import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavbarItems/NavBar";
import List from "../../components/Breakthrough/List"; // 알림 목록을 표시하는 컴포넌트
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination"; // 페이지네이션 컴포넌트
import { Cookies } from 'react-cookie';
import Footer from "../../components/Footer";
import getNotifications from "../../APIs/get/getNotifications"; // 알림 데이터 API

function NotificationPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]); // 전체 알림 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 10개의 알림 표시

  const cookies = new Cookies();

  useEffect(() => {
    const loggedIn = cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(); // 알림 데이터 API 호출
        setNotifications(data);
      } catch (error) {
        console.error("알림 로딩 실패:", error);
      }
    };

    fetchNotifications();
  }, []);

  // 페이지 변경 시
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsToShow = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>List of all your notifications</Title>
          <List
            items={itemsToShow} // 페이징된 알림 목록 전달
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(notifications.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </BreakthroughContainer>
      </Container>
      <Footer />
    </>
  );
}

export default NotificationPage;

// Styled Components
const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakthroughContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  flex-grow: 1;
  margin: 0vh 24vw 10vh 24vw;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 3vh;
  margin-bottom: 3vh;
`;
