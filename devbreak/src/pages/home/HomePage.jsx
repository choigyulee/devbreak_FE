import NavBar from "../../components/NavBar";
import BreakthroughTenList from "../../components/HomePageItems/BreakthroughTenList";
import BreakthroughData from "../../components/HomePageItems/BreakthroughData";
import BlogTenList from "../../components/HomePageItems/BlogTenList";
import BlogData from "../../components/HomePageItems/BlogData";
import MyBreakthroughList from "../../components/HomePageItems/MyBreakthroughList";
import MyBlogList from "../../components/HomePageItems/MyBlogList";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtoms";


function HomePage() {
  // 리코일 상태에서 로그인 여부를 가져옵니다.
  const { isLoggedIn } = useRecoilValue(authState); // 리코일 상태 가져오기

  const [auth, setAuth] = useRecoilState(authState);
  const onLogout = () => {
    setAuth({ isLoggedIn: false }); // 로그인 상태를 false로 변경
  };


  return (
    <>
      <NavBar onLogout={onLogout} isLoggedIn={auth.isLoggedIn} />
      <Container>
        <ListContainer>
          <BreakthroughTenList items={BreakthroughData} />
        </ListContainer>
        <ListContainer>
          <BlogTenList items={BlogData} />
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
