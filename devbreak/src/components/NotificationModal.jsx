import styled from "@emotion/styled";
import PropTypes from "prop-types"; // prop-types 추가

const NotificationModal = ({ notifications }) => {
  return (
    <ModalWrapper>
      <Header>
        <Title>Check out your new notifications! 📣</Title>
      </Header>
      <Content>
        {notifications.map((notification, index) => (
          <NotificationItem key={index}>
            <NotificationText>{notification.text}</NotificationText>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationItem>
        ))}
      </Content>
    </ModalWrapper>
  );
};

// prop-types를 사용하여 props 검증 추가
NotificationModal.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotificationModal;

const ModalWrapper = styled.div`
  position: absolute;
  right: -10vw;
  bottom: -10vh;
  width: 20vw;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  padding: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1.2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationText = styled.span`
  font-size: 0.9rem;
`;

const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;
