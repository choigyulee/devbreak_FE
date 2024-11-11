import { useState } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import PropTypes from "prop-types";
import { useAuth } from "../../AuthContext";

function BreakthroughPage() {
  const { isLoggedIn } = useAuth();
  const exampleItems = [
    {
      id: 1,
      title: "Exploring React hooks",
      createdAt: "2024.10.01",
      blogName: "Tech Blog A",
    },
    {
      id: 2,
      title: "JavaScript async/await deep dive",
      createdAt: "2024.10.02",
      blogName: "Tech Blog B",
    },
    {
      id: 3,
      title: "Understanding TypeScript types",
      createdAt: "2024.10.03",
      blogName: "Tech Blog C",
    },
    {
      id: 4,
      title: "Best practices for clean code",
      createdAt: "2024.10.04",
      blogName: "Tech Blog A",
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      createdAt: "2024.10.05",
      blogName: "Tech Blog D",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 15;
  // const totalPages = Math.ceil(exampleItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemClick = (articleId) => {
    navigate(`/breakthrough/article/${articleId}`); // 해당 articleId로 이동
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>Let’s Explore all breakthroughs!</Title>
          <List
            items={exampleItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemClick={handleItemClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(exampleItems.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </BreakthroughContainer>
      </Container>
    </>
  );
}

BreakthroughPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // 이 부분은 더 이상 필요하지 않음
};

export default BreakthroughPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakthroughContainer = styled.div`
  margin: 60px auto;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 25px;
  margin-bottom: 50px;
  min-width: 930px;
`;
