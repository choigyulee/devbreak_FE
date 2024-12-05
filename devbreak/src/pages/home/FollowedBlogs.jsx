/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import getHomeBlogLike from "../../APIs/get/getHomeBlogLike";

function FollowedBlogs() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [myBlogList, setMyBlogList] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 검색 결과 저장
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <MyBlogContainer>
          <FirstLineContainer>
            <MyBlogContainerText>Blogs you followed</MyBlogContainerText>
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
  justify-content: baseline;
  gap: 1vh;
  margin-bottom: 2vh;
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
