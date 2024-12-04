import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // 슬라이더 라이브러리 임포트
import NavBar from "../../components/NavBar";
import BreakthroughTenList from "../../components/HomePageItems/BreakthroughTenList";
import BlogTenList from "../../components/HomePageItems/BlogTenList";
import MyBreakthroughList from "../../components/HomePageItems/MyBreakthroughList";
import MyBlogList from "../../components/HomePageItems/MyBlogList";
import styled from "@emotion/styled";
import getHomeArticle from "../../APIs/get/getHomeArticle";
import getHomeBlog from "../../APIs/get/getHomeBlog"; // 블로그 데이터를 가져오는 함수 임포트
import Footer from "../../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  const [data, setData] = useState({ breakthroughs: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 및 강제 리로드 로직 개선
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = sessionStorage.getItem("accessToken");

      // 페이지 첫 로드 시 항상 리로드
      if (!sessionStorage.getItem("homePageLoaded")) {
        sessionStorage.setItem("homePageLoaded", "true");
        window.location.reload();
        return;
      }

      // 로그인 상태 확인
      if (accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // 로그아웃 함수 수정
  const onLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("homePageLoaded"); // 로그아웃 시 리로드 상태 초기화
    setIsLoggedIn(false);
    window.location.reload(); // 로그아웃 후 리로드
  };

  // 홈 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleResult, blogResult] = await Promise.all([
          getHomeArticle(), // 기사 데이터 가져오기
          getHomeBlog(), // 블로그 데이터 가져오기
        ]);
        setData({ breakthroughs: articleResult, blogs: blogResult });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 및 오류 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const bannerImages = ["/image/Banner1.png", "/image/Banner2.png"];

  const sliderSettings = {
    dots: true, // 네비게이션 도트 활성화
    infinite: true, // 무한 루프
    speed: 1000, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 하나의 슬라이드만 보이도록 설정
    slidesToScroll: 1, // 한 번에 하나의 슬라이드만 스크롤
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 간격
    arrows: false, // 좌우 화살표 표시
    draggable: false, // 슬라이드 드래그 가능
    rtl: true, // 슬라이드 방향을 오른쪽으로 변경
  };

  return (
    <>
      <NavBar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      <Container>
        <BannerSlider {...sliderSettings}>
          {bannerImages.map((src, index) => (
            <BannerImage key={index} src={src} alt={`Banner ${index + 1}`} />
          ))}
        </BannerSlider>
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
              <Link to="/like/breakthrough">
                <MyBreakthroughList />
              </Link>
              <Link to="/follow/blog">
                <MyBlogList />
              </Link>
            </span>
          </MyListBox>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;

// Styled Components
const Container = styled.div`
  margin: 0vh 15vw 13vh 15vw;
  display: flex;
  flex-direction: column;
  gap: 7vh;
`;

const BannerSlider = styled(Slider)`
  margin-top: -4vh;
  width: 100%;
  height: 50vh; /* 슬라이더 높이를 명확히 지정 */
  overflow: hidden; /* 슬라이더 영역 밖의 요소 숨김 */
  .slick-list {
    overflow: hidden; /* 추가적으로 슬라이더 리스트의 오버플로우 숨김 */
  }
`;

const BannerImage = styled.img`
  width: 100%;
  margin: -1vh;
  object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춤 */
  border-radius: 10px;
`;

const ListContainer = styled.div`
  margin-right: -15vw;
  margin-left: -2vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
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

const MyListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0vh 3vh 0 -1vh;
  gap: 3vh;
  span {
    display: flex;
    flex-direction: row;
    gap: 2vh;
  }
`;
