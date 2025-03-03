import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getNotice } from "../../APIs/get/getNotice";
import Pagination from "../../components/Breakthrough/Pagination";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotice();
        setNotifications(data);  // 전체 알림 데이터 설정
      } catch (error) {
        console.error("알림 가져오기 실패:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNotificationClick = (notice) => {
    // 알림 클릭 시 페이지로 이동
    switch (notice.type) {
      case "블로그 초대":
      case "블로그 즐겨찾기":
        navigate(`/blog/${notice.relatedId.blogId}`);
        break;
      case "글 좋아요":
        navigate(`/breakthrough/${notice.relatedId.articleId}`);
        break;
      default:
        break;
    }
  };

  const visibleNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageContainer>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>Catch up on your notifications</Title>
      <NotificationList>
        {visibleNotifications.map((notification, index) => (
          <NotificationItem key={index} onClick={() => handleNotificationClick(notification)}>
            <NotificationText>{notification.message}</NotificationText>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationItem>
        ))}
      </NotificationList>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(notifications.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
          </BreakthroughContainer>
          </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px;
`;

const NotificationList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  cursor: pointer;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NotificationText = styled.div`
  font-size: 1.1em;
`;

const NotificationTime = styled.div`
  color: #888;
  font-size: 0.9em;
`;


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
  white-space: nowrap; // 줄바꿈 방지
  align-items: baseline;
  text-align: left;
  justify-content: baseline;
  display: flex;
  flex-direction: row;
  margin-bottom: 3vh;
`;

export default NotificationPage;