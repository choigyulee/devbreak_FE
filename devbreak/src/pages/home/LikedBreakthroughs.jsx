import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import getHomeArticleLike from "../../APIs/get/getHomeArticleLike";

function LikedBreakthroughs() {
// 로그인 상태 관리 (로컬 스토리지 사용)
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [formData, setFormData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const navigate = useNavigate();

// 로그인 상태를 로컬 스토리지에서 가져오기
useEffect(() => {
  const loggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // 세션 스토리지에서 로그인 상태 확인
  setIsLoggedIn(loggedIn);
}, []);

// API 호출해서 데이터 가져오기
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getHomeArticleLike(); // API 호출
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
  navigate(`/breakthrough/${articleId}`); // 해당 articleId로 이동
};

return (
  <>
    <NavBar isLoggedIn={isLoggedIn} />
    <Container>
      <BreakthroughContainer>
        <Title>Breakthroughs what you liked</Title>

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

export default LikedBreakthroughs;

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
