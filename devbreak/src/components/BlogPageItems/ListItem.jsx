// ListItem.jsx
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ListItem = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </Container>
  );
};

ListItem.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ListItem;

const Container = styled.div`
  width: 530px;
  position: relative;
`;

const Item = styled.div`
  padding: 10px 0;
  font-size: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;
