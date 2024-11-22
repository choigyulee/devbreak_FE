import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import { authState } from "../../atoms/authAtoms";
import { useRecoilValue } from "recoil";
import getBreakthrough from "../../APIs/get/getBreakthrough";

function BreakthroughPage() {
  const { isLoggedIn } = useRecoilValue(authState);
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출해서 데이터 가져오기
    const fetchData = async () => {
      try {
        const data = await getBreakthrough(); // API 호출
        setFormData(data); // 상태에 데이터 저장
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchData(); // 컴포넌트 마운트 시 데이터 로딩
  }, []);

  const itemsPerPage = 10;

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
            items={formData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemClick={handleItemClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(formData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </BreakthroughContainer>
      </Container>
    </>
  );
}

// BreakthroughPage.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired, // 이 부분은 더 이상 필요하지 않음
// };

export default BreakthroughPage;

const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakthroughContainer = styled.div`
  margin: 3vh 15vw 13vh 15vw;
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
