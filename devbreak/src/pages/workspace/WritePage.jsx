import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import LanguageToggle from "../../components/Breakthrough/LanguageToggle";
import getBreakthrough from "../../APIs/get/getBreakthrough";

function BreakthroughPage() {
  // 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // 선택된 언어
  const navigate = useNavigate();

  const languageOptions = ["Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"];

  // 로그인 상태 확인
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // 세션 스토리지에서 로그인 상태 확인
    setIsLoggedIn(loggedIn);
  }, []);

  // API 호출해서 데이터 가져오기
  useEffect(() => {
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
    navigate(`/breakthrough/${articleId}`); // 해당 articleId로 이동
  };

  // 선택된 언어를 기준으로 데이터 필터링
  const filteredData = selectedLanguage
    ? formData.filter((item) => item.language && item.language.toLowerCase() === selectedLanguage.toLowerCase())
    : formData;

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <FirstLineContainer>
            <Title>Let’s Explore all breakthroughs!</Title>
            <LanguageToggle
              selectedValue={selectedLanguage}
              setSelectedValue={setSelectedLanguage}
              items={languageOptions}
            />
          </FirstLineContainer>
          <List
            items={filteredData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemClick={handleItemClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </BreakthroughContainer>
      </Container>
    </>
  );
}

export default BreakthroughPage;

const Container = styled.div`
  margin: 3vh 15vw 13vh 15vw;
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FirstLineContainer = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BreakthroughContainer = styled.div`
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
