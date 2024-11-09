import react, { useState } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from '../../components/Breakthrough/List';
import Pagination from "../../components/Breakthrough/Pagination";

function BreakthroughPage() {
  // 예시 목 데이터 (items)
  const exampleItems = [
    {
      id: 1,
      title: "Exploring React hooks",
      createdAt: "2024.10.01",
      blogName: "Tech Blog A"
    },
    {
      id: 2,
      title: "JavaScript async/await deep dive",
      createdAt: "2024.10.02",
      blogName: "Tech Blog B"
    },
    {
      id: 3,
      title: "Understanding TypeScript types",
      createdAt: "2024.10.03",
      blogName: "Tech Blog C"
    },
    {
      id: 4,
      title: "Best practices for clean code",
      createdAt: "2024.10.04",
      blogName: "Tech Blog A"
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      createdAt: "2024.10.05",
      blogName: "Tech Blog D"
    },
    {
      id: 6,
      title: "Node.js vs Deno",
      createdAt: "2024.10.06",
      blogName: "Tech Blog B"
    },
    {
      id: 7,
      title: "Understanding React context API",
      createdAt: "2024.10.07",
      blogName: "Tech Blog C"
    },
    {
      id: 8,
      title: "GraphQL vs REST API",
      createdAt: "2024.10.08",
      blogName: "Tech Blog D"
    },
    {
      id: 9,
      title: "How to use MongoDB with Node.js",
      createdAt: "2024.10.09",
      blogName: "Tech Blog A"
    },
    {
      id: 10,
      title: "Building an app with Vue.js",
      createdAt: "2024.10.10",
      blogName: "Tech Blog B"
    },
    {
      id: 2,
      title: "JavaScript async/await deep dive",
      createdAt: "2024.10.02",
      blogName: "Tech Blog B"
    },
    {
      id: 3,
      title: "Understanding TypeScript types",
      createdAt: "2024.10.03",
      blogName: "Tech Blog C"
    },
    {
      id: 4,
      title: "Best practices for clean code",
      createdAt: "2024.10.04",
      blogName: "Tech Blog A"
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      createdAt: "2024.10.05",
      blogName: "Tech Blog D"
    },
    {
      id: 6,
      title: "Node.js vs Deno",
      createdAt: "2024.10.06",
      blogName: "Tech Blog B"
    },
    {
      id: 7,
      title: "Understanding React context API",
      createdAt: "2024.10.07",
      blogName: "Tech Blog C"
    },
    {
      id: 8,
      title: "GraphQL vs REST API",
      createdAt: "2024.10.08",
      blogName: "Tech Blog D"
    },
    {
      id: 9,
      title: "How to use MongoDB with Node.js",
      createdAt: "2024.10.09",
      blogName: "Tech Blog A"
    },
    {
      id: 10,
      title: "Building an app with Vue.js",
      createdAt: "2024.10.10",
      blogName: "Tech Blog B"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15; // 한 페이지에 표시할 항목 수
  // const totalPages = Math.ceil(exampleItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <Container>
        <BreakthroughContainer>
          <Title>Let’s Explore all breakthroughs!</Title>
          <List
            items={exampleItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
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

export default BreakthroughPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const BreakthroughContainer = styled.div`
  margin: 98px 167px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; 
`

const Title = styled.div`
  color: #ffffff;
  font-size: 30px;
  margin-bottom: 40px;
`;