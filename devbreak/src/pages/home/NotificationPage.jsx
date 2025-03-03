import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import getNotice from "../../APIs/get/getNotice";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";
import getArticleArticleId from "../../APIs/get/getArticleArticleId";
import NavBar from "../../components/NavbarItems/NavBar";
import Footer from "../../components/Footer";
import Pagination from "../../components/Breakthrough/Pagination";
import Pagination from "../../components/Breakthrough/Pagination";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
      <NavBar />
      <Container>
        <Title>All Notifications</Title>
        <NotificationList>
          {notifications
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((notification, index) => (
              <NotificationItem key={index} onClick={() => handleNotificationClick(notification)}>
                <NotificationText isNew={!notification.isViewed}>{notification.message}</NotificationText>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
            ))}
        </NotificationList>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </Container>
      <Footer />
    </>
  );
};

export default NotificationPage;

const Container = styled.div`
  padding: 2vw;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 2vw;
  text-align: center;
  margin-bottom: 2vh;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2vh 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NotificationText = styled.span`
  color: ${(props) => (props.isNew ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
`;

const NotificationTime = styled.span`
  color: rgba(255, 255, 255, 0.6);
`;
