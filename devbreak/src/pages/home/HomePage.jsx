import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import BreakthroughTenList from "../../components/HomePageItems/BreakthroughTenList";
import BlogTenList from "../../components/HomePageItems/BlogTenList";
import MyBreakthroughList from "../../components/HomePageItems/MyBreakthroughList";
import MyBlogList from "../../components/HomePageItems/MyBlogList";
import styled from "@emotion/styled";
import getHomeArticle from "../../APIs/get/getHomeArticle";
import getHomeBlog from "../../APIs/get/getHomeBlog"; // 블로그 데이터를 가져오는 함수 임포트
import { useAuth } from "../../context/AuthContext";

function HomePage() {


  const [data, setData] = useState({ breakthroughs: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 직접 관리

  // 로그인 상태 관리 (예시로 로컬 스토리지나 세션 스토리지를 통해 관리할 수 있음)
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

    // 로그아웃 함수 추가
    const onLogout = () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 리디렉션
    };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleResult, blogResult] = await Promise.all([
          getHomeArticle(), // 기사 데이터 가져오기
          getHomeBlog(), // 블로그 데이터 가져오기
        ]);
        setData({ breakthroughs: articleResult, blogs: blogResult }); // API에서 받은 데이터를 상태에 저장
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavBar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      <Container>
        <ListContainer>
          <BreakthroughTenList items={data.breakthroughs} />
        </ListContainer>
        <ListContainer>
          <BlogTenList items={data.blogs} />
        </ListContainer>
        {isLoggedIn && (
          <MyListBox>
            <Title>
              List of Your <BoldText>fav Breakthroughs & Blogs</BoldText>
            </Title>
            <span>
              <MyBreakthroughList />
              <MyBlogList />
            </span>
          </MyListBox>
        )}
      </Container>
    </>
  );
}

export default HomePage;

const Container = styled.div`
  margin: 3vh 15vw 13vh 15vw;
  display: flex;
  flex-direction: column;
  gap: 9vh;
`;

const ListContainer = styled.div`
  margin-right: -15vw;
`;

const MyListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0vh 3vh;
  gap: 3vh;
  span {
    display: flex;
    flex-direction: row;
    gap: 3vh;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vh;
  font-size: 3vh;
  font-weight: 400;
  font-family: "pretendard";
  color: white;
`;

const BoldText = styled.span`
  font-weight: 700;
  font-size: 3vh;
  font-family: "Pretendard";
`;
