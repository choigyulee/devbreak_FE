import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import LanguageToggle from "../../components/Breakthrough/LanguageToggle";
import getBreakthrough from "../../APIs/get/getBreakthrough";
import { FaSearch } from "react-icons/fa";

function BreakthroughPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // 선택된 언어
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
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
        setFilteredData(data); // 초기 데이터 설정
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

  const handleSearch = () => {
    const filtered = formData.filter((item) => {
      const about = item.about || ""; // undefined일 경우 빈 문자열로 처리
      const title = item.title || "";
      const description = item.description || "";
      const blogName = item.blogName || ""; // blogName 필드 추가

      const matchesLanguage = !selectedLanguage || about.toLowerCase() === selectedLanguage.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blogName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLanguage && matchesSearch;
    });

    if (filtered.length === 0) {
      alert("해당하는 결과가 없습니다!");
      setSelectedLanguage("");
      setSearchQuery("");
      navigate("/breakthrough");
      setCurrentPage(1);
    } else {
      setFilteredData(filtered); // 검색 결과 업데이트
      setCurrentPage(1); // 검색 시 페이지 초기화
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>Let’s Explore all breakthroughs!</Title>
          <FirstLineContainer>
            <SearchContainer>
              <SearchIconButton onClick={handleSearch}>
                <FaSearch />
              </SearchIconButton>
              <SearchInput
                type="text"
                placeholder="Please enter your search term."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // Enter 키를 누르면 검색 실행
                  }
                }}
              />
            </SearchContainer>
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
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4vh;
  gap: 2vw;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    122.72deg,
    rgba(79, 79, 79, 0.1) 1.74%,
    rgba(79, 79, 79, 0.1) 1.75%,
    rgba(255, 255, 255, 0.1) 33.05%,
    rgba(79, 79, 79, 0.1) 97.16%
  );
  border: 1px solid #ffffff85;
  backdrop-filter: blur(40px);
  border-radius: 20vh;
  width: 30vw;
`;

const SearchInput = styled.input`
  font-size: 2vh;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  width: 100%;
  padding-left: 1vw;

  &::placeholder {
    color: #ffffff85;
  }
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #ffffff85;
  cursor: pointer;
  font-size: 2vh;

  &:hover {
    color: #02f798;
  }
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
  align-items: baseline;
  justify-content: baseline;
`;
