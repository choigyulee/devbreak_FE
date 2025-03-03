import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";



const NotificationList = ({ notifications = [], currentPage = 1, itemsPerPage = 15, maxWidth = "933px", onItemClick }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();


  const handleNotificationClick = (notice) => {
    switch (notice.type) {
      case "블로그 초대":
      case "블로그 즐겨찾기":ㄴ
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

  return (
    <ListContainer maxWidth={maxWidth}>
      <ListItemsContainer>
      {currentItems.map((notification, index) => (
            <ListItem key={index}>
              <ListItem onClick={() => handleNotificationClick(notification)}>
                <Title>{notification.message}</Title>
                <Info>{notification.time}</Info>
              </ListItem>
            </ListItem>
          ))}
      </ListItemsContainer>
    </ListContainer>
  );
};

NotificationList.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  maxWidth: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
};

const ListContainer = styled.div`
  font-family: "Urbanist", sans-serif;
  color: #ffffff;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
`;

const ListItemsContainer = styled.div`
  margin: 0 auto;
  min-width: 930px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
`;

const ListItem = styled.div`
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

const Title = styled.h3`
  font-size: 2.5vh;
  margin-bottom: 17px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
`;

const Info = styled.p`
  font-size: 2.5vh;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

export default NotificationList;