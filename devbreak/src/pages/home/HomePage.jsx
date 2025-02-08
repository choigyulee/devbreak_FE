import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // 슬라이더 라이브러리 임포트
import NavBar from "../../components/NavbarItems/NavBar";
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
import { useAuth } from "../../context/AuthContext";

function HomePage() {
  const [data, setData] = useState({ breakthroughs: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, logout } = useAuth();


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

  const bannerImages = [
    { src: "/image/Banner1.png", link: "/blog/39" }, // Banner1 링크 추가
    { src: "/image/Banner2.png" }, // Banner2 링크 추가 (예시)
    { src: "/image/Banner3.png", link: "/breakthrough/25" }, // Banner2 링크 추가 (예시)
  ];

  const sliderSettings = {
    dots: true, // 네비게이션 도트 활성화
    infinite: true, // 무한 루프
    speed: 1000, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 하나의 슬라이드만 보이도록 설정
    slidesToScroll: 1, // 한 번에 하나의 슬라이드만 스크롤
    autoplay: true, // 자동 재생
    autoplaySpeed: 2500, // 자동 재생 간격
    arrows: false, // 좌우 화살표 표시
    draggable: false, // 슬라이드 드래그 가능
    rtl: true, // 슬라이드 방향을 오른쪽으로 변경
  };

  return (
    <>
      <NavBar logout={logout} isLoggedIn={isLoggedIn} />
      <Container>
        <BannerSlider {...sliderSettings}>
          {bannerImages.map((banner, index) => (
            <Link to={banner.link} key={index}>
              <BannerImage src={banner.src} alt={`Banner ${index + 1}`} />
            </Link>
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
  gap: 8vh;
`;

const BannerSlider = styled(Slider)`
  margin-top: -4vh;
  width: 100%;
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
  cursor: pointer; /* 클릭 가능한 아이콘으로 표시 */
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
  margin: 0vh 2vh;
  gap: 3vh;
  span {
    display: flex;
    flex-direction: row;
    gap: 2vh;
  }
`;
