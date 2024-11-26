import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import NavBar from "../components/NavBar";
import { BsStarFill, BsPencil, BsGithub } from "react-icons/bs";
import GoToButton from "../components/GoToButton";
import List from "../components/Breakthrough/List";
import PropTypes from "prop-types";
import getBlogBlogId from "../APIs/get/getBlogBlogId";
import getIssuesAndCommits from "../APIs/get/getIssuesAndCommits";
import { useAuth } from "../context/AuthContext";

function BlogPage() {
  const { blogId } = useParams(); // URL에서 blogId 가져오기
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const { isLoggedIn, onLogout } = useAuth();
 
  const [blogData, setBlogData] = useState(null); // 블로그 데이터 상태
  const [issuesAndCommits, setIssuesAndCommits] = useState([]); 
  const [favButton, setFavButton] = useState(false); // 좋아요 버튼 상태

  // 로그인 상태를 sessionStorage에서 가져오기
  // useEffect(() => {
  //   const loggedIn = sessionStorage.getItem("isLoggedIn") === "true"; // 로컬 스토리지에서 로그인 상태 확인
  //   setIsLoggedIn(loggedIn);
  // }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogData = await getBlogBlogId(blogId); // API 호출
        setBlogData(fetchedBlogData);
        setFavButton(fetchedBlogData.fav_button); // 좋아요 상태 초기화
      } catch (error) {
        console.error("블로그 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  // 좋아요 버튼 클릭 핸들러
  const handleFavButtonClick = () => {
    setFavButton(!favButton); // 색상 변경 토글
  };

  // GitHub 아이콘 클릭 핸들러
  const handleGitHubClick = () => {
    window.open(blogData.git_repo_url, "_blank");
  };

  // 연필 아이콘 클릭 핸들러
  const handlePencilClick = () => {
    navigate(`/workspace/myblog/write/${blogId}`);
  };
  
    // 이슈 및 커밋 데이터 가져오기
    const fetchIssuesAndCommits = async (html_url) => {
      try {
        const data = await getIssuesAndCommits(html_url); // 이슈 및 커밋 데이터 API 호출
        setIssuesAndCommits(data);
      } catch (error) {
        console.error("Error fetching issues and commits:", error);
      }
    };

  const ActivityItem = ({ data }) => {
    const dotColor = data.state === "open" || data.state === null ? "#4ADE80" : "#8250DF";
    return (
      <ActivityItemContainer>
        <ActivityDot style={{ backgroundColor: dotColor }} />
        <ActivityContent>
          <ActivityMessage>{data.title}</ActivityMessage>
          <ActivityDate>{data.date}</ActivityDate>
        </ActivityContent>
      </ActivityItemContainer>
    );
  };

  ActivityItem.propTypes = {
    activity: PropTypes.shape({
      state: PropTypes.string,
      message: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  };

  const MemberItem = ({ member }) => <Member>{member}</Member>;
  MemberItem.propTypes = {
    member: PropTypes.string.isRequired,
  };

  // 로그인 상태 변경 함수
  // const handleLogin = () => {
  //   sessionStorage.setItem("isLoggedIn", "true"); // 로컬 스토리지에 로그인 상태 저장
  //   setIsLoggedIn(true); // 로그인 상태 업데이트
  // };

  // 로그아웃 함수
  // const handleLogout = () => {
  //   sessionStorage.setItem("isLoggedIn", "false"); // 로컬 스토리지에 로그인 상태 false로 설정
  //   setIsLoggedIn(false); // 로그인 상태 업데이트
  // };

  if (!blogData) {
    return <div>로딩 중...</div>; // 블로그 데이터 로딩 중 표시
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Container>
        <InfoContainer>
          <BlogInfo>
            <NameContainer>
              <BlogName>{blogData.blog_name}</BlogName>
              <StarButton
                onClick={handleFavButtonClick}
                style={{
                  color: favButton ? "#FFEC4C" : "white",
                }}
              >
                <BsStarFill size={30} />
              </StarButton>
            </NameContainer>
            <DescriptionContainer>
              <BlogDescription>
                {blogData.description}
                <IconContainer onClick={handleGitHubClick}>
                  <BsGithub size={24} />
                </IconContainer>
                {isLoggedIn && (
                  <IconContainer onClick={handlePencilClick}>
                    <BsPencil size={24} />
                  </IconContainer>
                )}
              </BlogDescription>
            </DescriptionContainer>
          </BlogInfo>
          <ContentContainer>
            <LeftColumn>
              <Section>
                <SectionTitle>Project Repository Activity</SectionTitle>
                <ActivityContainer>
                  {blogData.repositoryActivity && blogData.repositoryActivity.length > 0 ? (
                    blogData.repositoryActivity.map((data, index) => (
                      <ActivityItem key={index} activity={data} />
                    ))
                  ) : (
                    <NoActivityMessage>There is no Repository Activity !</NoActivityMessage>
                  )}
                </ActivityContainer>
              </Section>
              <Section>
                <SectionTitle>Project Members</SectionTitle>
                <MembersContainer>
                  {blogData.members.map((member, index) => (
                    <Member key={index}>{member}</Member>
                  ))}
                </MembersContainer>
              </Section>
            </LeftColumn>
            <RightColumn>
              <TitleContainer>
                <SectionTitle>The Breakthroughs ({blogData.break_throughs.length})</SectionTitle>
                {isLoggedIn && blogData.break_throughs.length > 0 && (
                  <GoToButton
                    onClick={() => navigate(`/blog/${blogId}/write`)}
                    fontSize="20px"
                    text="Write"
                    width="100px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                    }}
                  />
                )}
              </TitleContainer>
              <ListContainer>
                {blogData.break_throughs.length === 0 ? (
                  <EmptyState>
                    <p>
                      Share your <br /> breakthroughs with us!
                    </p>
                    <GoToButton
                      onClick={() => navigate(`/blog/${blogId}/write`)}
                      fontSize="20px"
                      text="Post my own breakthroughs"
                      width="380px"
                      height="40px"
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "20px",
                      }}
                    />
                  </EmptyState>
                ) : (
                  <List maxWidth={500} items={blogData.break_throughs} currentPage={1} itemsPerPage={15} />
                )}
              </ListContainer>
            </RightColumn>
          </ContentContainer>
        </InfoContainer>
      </Container>
    </>
  );
}

export default BlogPage;

const Container = styled.div`
  margin-bottom: 300px;
  font-family: "Urbanist";
  color: #ffffff;
`;
const InfoContainer = styled.div`
  margin: 3vh auto;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 930px;
`;
const BlogInfo = styled.div`
  margin-bottom: 40px;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
`;
const BlogName = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin: 0;
`;
const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  opacity: 0.9;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
`;
const BlogDescription = styled.div`
  font-size: 25px;
  max-width: 60vw;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: baseline;
`;
const IconContainer = styled.div`
  margin-left: 15px;
  cursor: pointer;
`;
const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
`;
const LeftColumn = styled.div`
  flex: 1;
  margin-right: 50px;
`;
const RightColumn = styled.div`
  flex: 1;
  position: relative;
`;
const Section = styled.div`
  margin-bottom: 30px;
`;
const SectionTitle = styled.div`
  font-family: "Pretendard";
  font-size: 25px;
  margin-bottom: 20px;
`;
const ActivityContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;
const ActivityItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
`;
const ActivityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
`;
const ActivityContent = styled.div`
  flex: 1;
`;
const ActivityMessage = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const ActivityDate = styled.div`
  font-size: 20px;
  color: #888;
`;

const MembersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 20px;
`;
const Member = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;
const TitleContainer = styled.div`
  width: 518px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const ListContainer = styled.div`
  width: 530px;
  position: relative;
`;
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 83%;
  min-height: 560px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  color: #888;
  p {
    font-family: "Pretendard";
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 20px;
  }
`;
const NoActivityMessage = styled.div`
  font-size: 2vh;
  color: #888;
`;
