import React from 'react';
import styled from '@emotion/styled';

const List = ({
  items = [],
  currentPage = 1,
  itemsPerPage = 15,
  maxWidth = "933px"
}) => {
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
  margin: 0 auto;
  min-width: 930px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 42px;
`;

const ListItem = styled.div`
  padding-left: 12px;
  border-left: 2px solid #ffffff;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-left: 4px solid #71FFC9; 
    color: #71FFC9; 
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
