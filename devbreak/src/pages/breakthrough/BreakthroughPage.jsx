import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "../../components/NavbarItems/NavBar";
import List from "../../components/Breakthrough/List";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Breakthrough/Pagination";
import LanguageToggle from "../../components/Breakthrough/LanguageToggle";
import getBreakthrough from "../../APIs/get/getBreakthrough";
import { FaSearch } from "react-icons/fa";
import Footer from "../../components/Footer";
import { Cookies } from 'react-cookie';

function BreakthroughPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(""); // 선택된 언어
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const loggedIn = cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getBreakthrough(); // 데이터 API 호출
          const filteredData = data.filter(item => item.blogId !== 39); // 블로그 ID가 39인 항목 제외
          setFormData(filteredData);
          setFilteredData(filteredData); // 초기 데이터 설정
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
        }
      };

    fetchData();
  }, []);


  // 언어 선택 변경 시 필터링
  useEffect(() => {
    const filtered = formData.filter((item) => {
      const about = item.about || "";
      return !selectedLanguage || about.toLowerCase() === selectedLanguage.toLowerCase();
    });

    setFilteredData(filtered);
    setCurrentPage(1); // 페이지 초기화
  }, [selectedLanguage, formData]);

  const handleSearch = () => {
    const filtered = formData.filter((item) => {
      const title = item.title || "";
      const blogName = item.blogName || "";
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blogName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (filtered.length === 0) {
      alert("There is no Breakthrough!");
      setSearchQuery("");
      setFilteredData(formData); // 초기 데이터로 복원
    } else {
      setFilteredData(filtered);
    }
    setCurrentPage(1); // 페이지 초기화
  };

  const languageOptions = ["Java", "HTML", "JavaScript", "Python", "TypeScript", "Kotlin", "C#", "C++", "CSS", "Swift"];
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemClick = (articleId) => {
    navigate(`/breakthrough/${articleId}`);
  };

  // 검색어와 입력 중에 따라 border 색상 변경
  const borderColor = searchQuery || isComposing ? "#02F798" : "#ffffff85";
  const iconColor = searchQuery || isComposing ? "#02F798" : "#ffffff85";
  const textColor = searchQuery ? "#02F798" : "#ffffff"; // Change text color if there is a search query

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <BreakthroughContainer>
          <Title>Let’s Explore all breakthroughs!</Title>
          <FirstLineContainer>
            <SearchContainer borderColor={borderColor}>
              <SearchIconButton iconColor={iconColor} onClick={handleSearch}>
                <FaSearch />
              </SearchIconButton>
              <SearchInput
                type="text"
                placeholder="Please enter your search term."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isComposing) {
                    handleSearch(); // Enter 키를 누르면 검색 실행
                  }
                }}
                onCompositionStart={() => setIsComposing(true)} // IME 입력 시작
                onCompositionEnd={() => setIsComposing(false)} // IME 입력 종료
                textColor={textColor} // Apply text color when typing
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
          <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
          </PaginationContainer>
        </BreakthroughContainer>
      </Container>
      <Footer />
    </>
  );
}

export default BreakthroughPage;

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
  align-items: center;
  margin-bottom: 5vh;
  width: 100%;
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
  border: 1px solid ${(props) => props.borderColor};
  backdrop-filter: blur(40px);
  padding: 1.5vh 0.5vh;
  border-radius: 20vh;
  flex-grow: 1; /* 나머지 공간 차지 */
`;

const SearchInput = styled.input`
  font-size: 2vh;
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.textColor}; // Dynamically change the text color
  padding-left: 1vw;
  flex: 1;
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${(props) => props.iconColor};
  cursor: pointer;
  font-size: 2vh;
  margin-left: 1vw;
  &:hover {
    color: #02f798;
  }
`;

const BreakthroughContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  flex-grow: 1;
  margin: 0vh 24vw 10vh 24vw;
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 3vh;
  white-space: nowrap; // 줄바꿈 방지
  align-items: baseline;
  text-align: left;
  justify-content: baseline;
  display: flex;
  flex-direction: row;
  margin-bottom: 3vh;
`;

const PaginationContainer = styled.div`
  display: flex;
  padding: 0 2vw;
`