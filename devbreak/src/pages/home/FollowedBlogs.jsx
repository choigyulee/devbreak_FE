import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import getHomeBlogLike from "../../APIs/get/getHomeBlogLike";
import { FaSearch } from "react-icons/fa";

function FollowedBlogs() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [myBlogList, setMyBlogList] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 검색 결과 저장
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태

  useEffect(() => {
    const fetchMyBlogList = async () => {
      try {
        const blogs = await getHomeBlogLike();
        setMyBlogList(blogs);
        setFilteredData(blogs); // 초기 데이터 설정
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchMyBlogList();
    }
  }, [isLoggedIn]);

  const handleSearch = () => {
    const filtered = myBlogList.filter((blog) => {
      const title = blog.blog_name || "";
      const description = blog.description || "";
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (filtered.length === 0) {
      alert("No blogs match your search query!");
      setFilteredData(myBlogList); // 초기 데이터로 복원
    } else {
      setFilteredData(filtered); // 검색된 데이터로 갱신
    }
  };

  const handleNavigateToBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (!isLoggedIn) {
    return null; // 로그인 상태가 아니면 내용 표시하지 않음
  }

  const borderColor = searchQuery || isComposing ? "#02F798" : "#ffffff85";
  const iconColor = searchQuery || isComposing ? "#02F798" : "#ffffff85";
  const textColor = searchQuery ? "#02F798" : "#ffffff";

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <MyBlogContainer>
          <FirstLineContainer>
            <MyBlogContainerText>Blogs you followed</MyBlogContainerText>
            <SearchContainer borderColor={borderColor}>
              <SearchIconButton iconColor={iconColor} onClick={handleSearch}>
                <FaSearch />
              </SearchIconButton>
              <SearchInput
                type="text"
                placeholder="Search blog title or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isComposing) {
                    handleSearch(); // Enter 키를 누르면 검색 실행
                  }
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                textColor={textColor}
              />
            </SearchContainer>
          </FirstLineContainer>

          {loading && <p>Loading blogs...</p>}
          {error && <p>Error loading blogs: {error.message}</p>}

          {filteredData.map((blog, index) => (
            <MyBlogItem key={index} onClick={() => handleNavigateToBlog(blog.blog_id)}>
              <BlogName>{blog.blog_name}</BlogName>
              <BlogDescription>{blog.description}</BlogDescription>
            </MyBlogItem>
          ))}
        </MyBlogContainer>
      </Container>
    </>
  );
}

export default FollowedBlogs;

// Styled Components
const Container = styled.div`
  font-family: "Pretendard";
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyBlogContainer = styled.div`
  margin: 0vh 20vw 10vh 20vw;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MyBlogContainerText = styled.div`
  margin: 0 auto;
  text-align: left;
  min-width: 930px;
  font-size: 3vh;
  line-height: 3vh;
  margin-bottom: 20px;
`;

const FirstLineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vh;
  margin-bottom: 5vh;
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
  flex-grow: 1;
`;

const SearchInput = styled.input`
  font-size: 2vh;
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => props.textColor};
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

const MyBlogItem = styled.div`
  align-items: baseline;
  justify-content: center;
  margin: 0 auto;
  width: 60vw;
  height: 15vh;
  border-radius: 3vh;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
  padding: 2.2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  cursor: pointer;

  &:hover {
    color: #02f798;
    border: 1px solid #02f798;
    box-shadow: 0px 0px 10px rgba(2, 247, 152, 0.25);
  }
`;

const BlogName = styled.div`
  font-size: 2.8vh;
  font-family: "Urbanist";
  font-weight: bold;
  text-align: left;
`;

const BlogDescription = styled.div`
  font-size: 2.3vh;
  font-family: "Urbanist";
  word-wrap: break-word;
  text-align: left;
  white-space: normal;
  word-break: break-word;
`;
