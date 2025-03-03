import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import getNoticeCount from "../../APIs/get/getNoticeCount";
import putNoticeNoticeId from "../../APIs/put/putNoticeNoticeId"

const NotificationModal = ({ notifications, onNotificationClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const data = await getNoticeCount();
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, []); 

  const navigate = useNavigate(); 

  const handleNotificationClick = async (notice) => {
    
    if (!notice.isViewed) {
      try {
        await putNoticeNoticeId(notice.noticeId);
        onNotificationClick(notice.noticeId); // 부모 컴포넌트로 상태 업데이트 요청
      } catch (error) {
        console.error('알림 상태 업데이트 실패:', error);
      }
    }

    switch (notice.type) {
      case "블로그 초대":
      case "블로그 즐겨찾기":
        // 블로그 페이지로 이동 (blogId 사용)
        navigate(`/blog/${notice.relatedId.blogId}`);
        break;
      case "글 좋아요":
        // 글 페이지로 이동 (articleId 사용)
        navigate(`/breakthrough/${notice.relatedId.articleId}`);
        break;
      default:
        console.log("Notification clicked, but no specific page for this type.");
        break;
    }
  };

  const visibleNotifications = notifications.slice(0, 4);

  return (
    <ModalContainer>
      <DashBoard>
        <Header>
          <strong>{`${unreadCount} new notifications`}</strong> <span>🔔</span>
        </Header>
        <Divider />
        <Content>
          {visibleNotifications.map((notification, index) => (
            <div key={index}>
              <NotificationItem onClick={() => handleNotificationClick(notification)}>
                <NotificationText>{notification.message}</NotificationText>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
              <Divider /> {/* 모든 NotificationItem 아래에 Divider 추가 */}
            </div>
          ))}
        </Content>
        {notifications.length > 4 && <ReadMoreButton onClick={()=>navigate(`/notification`)}>Read more</ReadMoreButton>}
      </DashBoard>
    </ModalContainer>
  );
};

// prop-types를 사용하여 props 검증 추가
NotificationModal.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotificationModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 5vh;
  right: 0vw;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashBoard = styled.div`
  box-sizing: border-box;
  padding: 4vh 3vw 4vh 3vw;
  width: 25vw;
  gap: 2vh;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vh solid #02f798;
  backdrop-filter: blur(5vh);
  border-radius: 2vh;
  color: #ffffff;
`;

const Header = styled.h2`
  color: #ffffff;
  text-align: left;
  margin-bottom: 0.5vh;
  display: flex;
  flex-direction: row;
  gap: 0.3vh;

  strong {
    font-weight: 700;
    font-size: 1.5vw;
  }

  span {
    font-size: 1.5vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -2vh;
  gap: 0; /* Divider로 구분되므로 gap 제거 */
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh 0;
  cursor: pointer;
`;

const NotificationText = styled.span`
  font-size: 1vw;
  font-weight: 400;
  width: 80vw;
  color: #ffffff;
`;

const NotificationTime = styled.span`
  font-size: 0.8vw;
  text-align: right;
  width: 19vw;
  color: rgba(255, 255, 255, 0.6);
`;

const Divider = styled.hr`
  border: 0.1vh solid #ffffff;
  margin: 0;
`;

const ReadMoreButton = styled.button`
  background: transparent;
  color: #ffffff;
  padding: 0.5vh 3vw;
  font-size: 1.5vw;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  margin-top: 2vh;

  &:hover {
    color: #02f798;
  }
`;
