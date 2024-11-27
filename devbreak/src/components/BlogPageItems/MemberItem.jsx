// MemberItem.jsx
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const MemberItem = ({ members }) => {
  return (
    <Container>
      {members.map((member, index) => (
        <Member key={index}>{member}</Member>
      ))}
    </Container>
  );
};

MemberItem.propTypes = {
  members: PropTypes.array.isRequired,
};

export default MemberItem;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
`;

const Member = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;
