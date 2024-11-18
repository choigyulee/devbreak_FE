import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/NavBar";
import BreakthroughTenList from "../../components/HomePageItems/BreakthroughTenList";
import BreakthroughData from "../../components/HomePageItems/BreakthroughData";
import BlogTenList from "../../components/HomePageItems/BlogTenList";
import BlogData from "../../components/HomePageItems/BlogData";
import MyBreakthroughList from "../../components/HomePageItems/MyBreakthroughList";
import MyBlogList from "../../components/HomePageItems/MyBlogList";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

function HomePage() {
  const { isLoggedIn } = useAuth(); // useAuth 훅을 사용하여 로그인 상태 가져오기

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
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

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // 이 부분은 더 이상 필요하지 않음
};

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
