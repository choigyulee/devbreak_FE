import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import LanguageToggle from "../../components/Breakthrough/LanguageToggle";
import getBreakthrough from "../../APIs/get/getBreakthrough";

function BreakthroughPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // 선택된 언어
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBreakthrough(); // 데이터 API 호출
        setFormData(data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, []);

  const languageOptions = ["Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"];

  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemClick = (articleId) => {
    navigate(`/breakthrough/${articleId}`);
  };

  // 선택된 언어를 기준으로 데이터 필터링
  const filteredData = formData.filter(
    (item) => !selectedLanguage || item.about.toLowerCase() === selectedLanguage.toLowerCase()
  );

  // 필터링된 데이터가 없으면 alert 띄우고, selectedLanguage 초기화 및 초기 페이지로 리다이렉트
  useEffect(() => {
    if (selectedLanguage && filteredData.length === 0) {
      alert("There is No Breakthrough!");
      setSelectedLanguage(""); // 초기 상태로 되돌림
      navigate("/breakthrough"); // `/breakthrough` 페이지로 리다이렉트 (언어 선택 없이)
      setCurrentPage(1); // 첫 페이지로 되돌림
    }
  }, [selectedLanguage, filteredData, navigate]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <FirstLineContainer>
            <Title>Let’s Explore all breakthroughs!</Title>
            <LanguageToggle
              selectedValue={selectedLanguage}
              items={languageOptions} // `languageOptions`를 items로 전달
              setSelectedValue={setSelectedLanguage}
            />
          </FirstLineContainer>
          <List
            items={filteredData} // 필터링된 데이터 전달
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

// Styled Components
const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FirstLineContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4vh;
  gap: 13vw;
`;

const BreakthroughContainer = styled.div`
  width: 60vw;
  margin: 0vh 20vw 10vh 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 3vh;
  white-space: nowrap; // 줄바꿈 방지
`;
