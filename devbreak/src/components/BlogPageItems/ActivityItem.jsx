import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ActivityItem = ({ activity }) => {
  return (
    <ItemContainer>
      <Dot
        style={{
          backgroundColor: activity.type === "Commit" ? "#4ADE80" : "#8250DF", // 타입별 색상 지정
        }}
      />
      <Content>
        <Message>{activity.title}</Message>
        <TypeLabel>{activity.type.toUpperCase()}</TypeLabel> {/* 타입 표시 */}
      </Content>
    </ItemContainer>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // "commit" 또는 "issue" 등
  }).isRequired,
};

export default ActivityItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5vh;
  gap: 1vw;
`;

const Dot = styled.div`
  width: 1vh;
  height: 1vh;
  border-radius: 50%;
  margin-top: 0.6vh;
`;

const Content = styled.div`
  flex: 1;
`;

const Message = styled.div`
  font-size: 2.5vh;
  margin-bottom: 0.4vh;
`;

const TypeLabel = styled.div`
  font-size: 2vh;
  color: #888;
  font-style: italic;
`;
