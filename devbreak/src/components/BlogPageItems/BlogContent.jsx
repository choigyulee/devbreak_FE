import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import GoToButton from "../GoToButton";
import List from "./List";
import ActivityItem from "./ActivityItem";
import { IoDocumentTextOutline } from "react-icons/io5";
import OfficialBlogBox from "../BlogPageItems/OfficialBlogBox";
import getBlogBlogId from "../../APIs/get/getBlogBlogId";


function BlogContent({ blogData, isLoggedIn, blogId, navigate, currentUserId, activities }) {
  const isMember = blogData.members.includes(currentUserId);

  // activities 배열에서 처음 8개만 추출
  const activitiesToDisplay = activities.slice(0, 8);

  // 블로그 데이터에서 break_throughs 배열을 가져오기
  const breakThroughs = blogData.break_throughs || []; // break_throughs가 없을 수 있기 때문에 기본값을 빈 배열로 설정

  const handleItemClick = (articleId) => {
    navigate(`/breakthrough/${articleId}`); // 해당 articleId로 이동
  };

  // 블로그 데이터 상태
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 특정 블로그 데이터를 가져오는 함수
  const fetchBlogData = async (blogId) => {
    try {
      const data = await getBlogBlogId(blogId); // API 호출
      return data;
    } catch (err) {
      console.error("Error fetching blog:", err);
      throw err;
    }
  };

  // 컴포넌트가 마운트될 때 블로그 데이터 가져오기
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const blog32 = await fetchBlogData("32");
        const blog38 = await fetchBlogData("38");

        // 블로그 데이터 상태 업데이트
        setBlogs([blog32, blog38]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs: {error.message}</div>;
  }

  return (
    <ContentContainer>
      <LeftColumn>
        {blogId !== "39" ? (
          <>
            <Section>
              <SectionTitle>Project Members</SectionTitle>
              <MembersContainer>
                {blogData.members.map((member, index) => (
                  <Member key={index}>{member}</Member>
                ))}
              </MembersContainer>
            </Section>
            <Section>
              <SectionTitle>Project Repository Activity</SectionTitle>
              <ActivityContainer>
                {activitiesToDisplay && activitiesToDisplay.length > 0 ? (
                  activitiesToDisplay.map((activity, index) => <ActivityItem key={index} activity={activity} />)
                ) : (
                  <NoActivityMessage>There is no Repository Activity!</NoActivityMessage>
                )}
              </ActivityContainer>
            </Section>
          </>
        ) : (
          <Section>
            <SectionTitle>devbreak Developers' blog</SectionTitle>
            <>
              {blogs.map(blog => (
                <OfficialBlogBox
                  key={blog.blog_id}
                  blogId={blog.blog_id}
                  blogName={blog.blog_name}
                  description={blog.description}
                />
              ))}
            </>
          </Section>
        )}
      </LeftColumn>

      <RightColumn>
        <TitleContainer>
        {blogId !== "39" ? (<SectionTitle>The Breakthroughs ({breakThroughs.length})</SectionTitle>) : (
          <SectionTitle>Notice ({breakThroughs.length})</SectionTitle>
        )}
          {isLoggedIn && isMember && breakThroughs.length > 0 && (
            <GoToButton
              onClick={() => navigate(`/blog/${blogId}/breakthrough/write`)}
              fontSize="18px"
              text="Go To Write"
              width="150px"
              height="35px"
              style={{
                position: "absolute",
                right: "0",
                top: "-11px",
              }}
            />
          )}
        </TitleContainer>
        <ListContainer>
          {isLoggedIn ? (
            isMember ? (
              breakThroughs.length === 0 ? (
                <EmptyState>
                  <p>
                    Share your <br /> breakthroughs with us!
                  </p>
                  <GoToButton
                    onClick={() => navigate(`/blog/${blogId}/breakthrough/write`)}
                    fontSize="2vh"
                    text="Post my own breakthroughs"
                    width="20vw"
                    height="5vh"
                    style={{
                      position: "absolute",
                      right: "0",
                      bottom: "20px",
                    }}
                  />
                </EmptyState>
              ) : (
                <List
                  maxWidth={500}
                  items={breakThroughs}
                  currentPage={1}
                  itemsPerPage={15}
                  onItemClick={handleItemClick}
                />
              )
            ) : breakThroughs.length === 0 ? (
              <EmptyState>
                <StyledIoDocumentTextOutline />
                <NoArticleMessage>There is no Breakthrough</NoArticleMessage>
              </EmptyState>
            ) : (
              <List
                maxWidth={500}
                items={breakThroughs}
                currentPage={1}
                itemsPerPage={15}
                onItemClick={handleItemClick}
              />
            )
          ) : breakThroughs.length === 0 ? (
            <EmptyState>
              <NoArticleMessage>There is no Breakthrough</NoArticleMessage>
            </EmptyState>
          ) : (
            <List
              maxWidth={500}
              items={breakThroughs}
              currentPage={1}
              itemsPerPage={15}
              onItemClick={handleItemClick}
            />
          )}
        </ListContainer>
      </RightColumn>
    </ContentContainer>
  );
}

BlogContent.propTypes = {
  blogData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  blogId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired, // activities prop 추가
};

export default BlogContent;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60vw;
  justify-content: center;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin-right: 4vw;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 3vh;
`;

const SectionTitle = styled.div`
  font-family: "Pretendard";
  font-size: 2.5vh;
  margin-bottom: 2vh;
`;

const ActivityContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  padding: 2vh;
  width: 25vw;
  max-height: 100vh; /* 스크롤이 필요한 최대 높이 설정 */
  overflow-y: hidden; /* 콘텐츠가 넘칠 때 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

const MembersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  width: 25vw;
  padding: 2vh;
`;


const Member = styled.div`
  margin-bottom: 1vh;
  font-size: 2vh;
`;

const TitleContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  width: 30vw;
  position: relative;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 50vh;
  text-align: center;
  min-height: 56vh;
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  color: #888;
  p {
    font-family: "Pretendard";
    font-size: 3vh;
    color: #ffffff;
    margin-bottom: 2vh;
  }
`;

const NoActivityMessage = styled.div`
  font-size: 2vh;
  color: #888;
`;

const NoArticleMessage = styled.div`
  font-family: "Pretendard";
  font-size: 3vh;
  color: #888;
`;

const StyledIoDocumentTextOutline = styled(IoDocumentTextOutline)`
  font-size: 5vh;
  color: #888;
`;

