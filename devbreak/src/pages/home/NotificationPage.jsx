import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import getNotice from "../../APIs/get/getNotice";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import getArticleArticleId from "../../APIs/get/getArticleArticleId";
import NavBar from "../../components/NavbarItems/NavBar";
import Footer from "../../components/Footer";
import Pagination from "../../components/Breakthrough/Pagination";
import { Cookies } from 'react-cookie';

const NotificationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const loggedIn = cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotice();
        const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time)); // 최신순으로 정렬

        const formattedNotifications = await Promise.all(
          sortedData.map(async (notice) => {
            let message = '';
            let blogName = '';
            let articleTitle = '';

            if (notice.type === "블로그 초대" || notice.type === "블로그 즐겨찾기") {
              try {
                const blogData = await getBlogBlogId(notice.relatedId.blogId);
                blogName = blogData.blog_name;
              } catch (error) {
                console.error('Failed to fetch blog name:', error);
              }
            }

            if (notice.type === "글 좋아요") {
              try {
                const articleData = await getArticleArticleId(notice.relatedId.articleId);
                articleTitle = articleData.title;
              } catch (error) {
                console.error('Failed to fetch article title:', error);
              }
            }

            switch (notice.type) {
              case "블로그 초대":
                message = `${notice.instigator} invited you to join the blog '${blogName}'.`;
                break;
              case "블로그 즐겨찾기":
                message = `${notice.instigator} added blog '${blogName}' to their favorites.`;
                break;
              case "글 좋아요":
                message = `${notice.instigator} liked your article '${articleTitle}'.`;
                break;
              default:
                message = `${notice.instigator} sent you a new notification.`;
                break;
            }

            return {
              ...notice,
              message,
            };
          })
        );

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (notice) => {
    switch (notice.type) {
      case "블로그 초대":
      case "블로그 즐겨찾기":
        navigate(`/blog/${notice.relatedId.blogId}`);
        break;
      case "글 좋아요":
        navigate(`/breakthrough/${notice.relatedId.articleId}`);
        break;
      default:
        console.log("Notification clicked, but no specific page for this type.");
        break;
    }
  };

  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>All Notifications</Title>
          <NotificationList>
            <NotificationitemList>
              {notifications
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((notification, index) => (
                  <NotificationItem key={index} onClick={() => handleNotificationClick(notification)}>
                    <NotificationText isNew={!notification.isViewed}>{notification.message}</NotificationText>
                    <NotificationTime>{notification.time}</NotificationTime>
                  </NotificationItem>
                ))}
            </NotificationitemList>
          </NotificationList>
          <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(notifications.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
          </PaginationContainer>
        </BreakthroughContainer>
      </Container>
      <Footer />
    </>
  );
};

export default NotificationPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotificationList = styled.div`
  font-family: "Urbanist", sans-serif;
  color: #ffffff;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
`;

const NotificationitemList = styled.div`
  margin: 0 auto;
  min-width: 930px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
`;

const NotificationItem = styled.div`
  width: 57vw;
  padding-left: 3vh;
  border-left: 2px solid #ffffff;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-left: 4px solid #71ffc9;
    color: #71ffc9;
  }
`;

const NotificationText = styled.div`
  color: ${(props) => (props.isNew ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};

&:hover {
  color: ${(props) => (props.isNew ? '#02f798' : 'inherit')};
}
  font-size: 2.5vh;
  margin-bottom: 17px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
`;

const NotificationTime = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 2.5vh;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`