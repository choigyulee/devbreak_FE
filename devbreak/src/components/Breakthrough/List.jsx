import styled from "@emotion/styled";
import PropTypes from "prop-types";

const List = ({ items = [], currentPage = 1, itemsPerPage = 15, maxWidth = "933px", onItemClick }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <ListContainer maxWidth={maxWidth}>
      <ListItemsContainer>
        {currentItems.map((item) => (
          <ListItem key={item.id} onClick={() => onItemClick(item.id)}>
            {" "}
            {/* 클릭 이벤트 추가 */}
            <Title>{item.title}</Title>
            <Info>{item.createdAt && item.blogName ? `${item.createdAt} | ${item.blogName}` : item.description}</Info>
          </ListItem>
        ))}
      </ListItemsContainer>
    </ListContainer>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired, // 이 부분은 더 이상 필요하지 않음
  itemsPerPage: PropTypes.number.isRequired, // 이 부분은 더 이상 필요하지 않음
  maxWidth: PropTypes.string,
  onItemClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러 추가
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
  gap: 42px;
`;

const ListItem = styled.div`
  width: 57vw;
  padding-left: 12px;
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
  font-size: 30px;
  margin-bottom: 17px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
`;

const Info = styled.p`
  font-size: 25px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;

export default List;
