// ActivityItem.jsx
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ActivityItem = ({ activities }) => {
  return (
    <Container>
      {activities && activities.length > 0 ? (
        activities.map((activity, index) => (
          <ItemContainer key={index}>
            <Dot
              style={{
                backgroundColor: activity.state === "open" || activity.state === null ? "#4ADE80" : "#8250DF",
              }}
            />
            <Content>
              <Message>{activity.title}</Message>
              <Date>{activity.date}</Date>
            </Content>
          </ItemContainer>
        ))
      ) : (
        <NoActivityMessage>There is no Repository Activity!</NoActivityMessage>
      )}
    </Container>
  );
};

ActivityItem.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ActivityItem;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
`;

const Content = styled.div`
  flex: 1;
`;

const Message = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const Date = styled.div`
  font-size: 20px;
  color: #888;
`;

const NoActivityMessage = styled.div`
  font-size: 2vh;
  color: #888;
`;
