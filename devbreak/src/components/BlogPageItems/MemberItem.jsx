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
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  padding: 2vh;
`;

const Member = styled.div`
  margin-bottom: 1vh;
  font-size: 2vh;
`;
