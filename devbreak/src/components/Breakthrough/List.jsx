import React from 'react';
import styled from '@emotion/styled';

const List = ({
  items = [],
  currentPage = 1,
  itemsPerPage = 15,
  onPageChange = () => {},
  maxWidth = "933px"
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <ListContainer maxWidth={maxWidth}>
      <ListItemsContainer>
        {currentItems.map((item) => (
          <ListItem key={item.id}>
            <Title>
              {item.title}
            </Title>
            <Info>
              {item.createdAt} | {item.blogName}
            </Info>
          </ListItem>
        ))}
      </ListItemsContainer>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  font-family: 'Urbanist', sans-serif;
  color: #ffffff;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
`;

const ListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

const ListItem = styled.div`
  padding-left: 12px;
  border-left: 2px solid #ffffff;  // 기본 상태에서는 흰색 선
  color: #ffffff;  // 기본 텍스트 색은 흰색
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-left: 4px solid #71FFC9;  // 호버 시 강조된 색상
    color: #71FFC9;  // 호버 시 텍스트 색상 변경
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
