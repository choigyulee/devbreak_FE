import styled from "@emotion/styled";
import NavBar from "../../components/NavBar";
import BreakthroughTenList from "../../components/HomePageItems/BreakthroughTenList";
import BreakthroughData from "../../components/HomePageItems/BreakthroughData";
import BlogTenList from "../../components/HomePageItems/BlogTenList";
import BlogData from "../../components/HomePageItems/BlogData";
import MyBreakthroughList from "../../components/HomePageItems/MyBreakthroughList";
import MyBlogList from "../../components/HomePageItems/MyBlogList";

function HomePage() {
  return (
    <>
      <NavBar />
      <Container>
        <ListContainer>
          <BreakthroughTenList items={BreakthroughData} />
        </ListContainer>
        <ListContainer>
          <BlogTenList items={BlogData} />
        </ListContainer>
        <MyListBox>
          <Title>
            List of Your <BoldText>fav Breakthroughs & Blogs</BoldText>
          </Title>
          <span>
            <MyBreakthroughList />
            <MyBlogList />
          </span>
        </MyListBox>
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
  margin-right: -15vw; /* 음수 마진 유지 */
  /* 필요에 따라 추가 스타일을 적용할 수 있습니다. */
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
  font-family: "Pretendard"; // devbreak에 대한 font-weight 설정
`;
