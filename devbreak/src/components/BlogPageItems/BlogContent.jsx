import styled from "@emotion/styled";
import PropTypes from "prop-types";
import GoToButton from "../GoToButton";
import List from "./List";
import ActivityItem from "./ActivityItem";

function BlogContent({ blogData, isLoggedIn, blogId, navigate, currentUserId, activities }) {
  const isMember = blogData.members.includes(currentUserId);

  // activities 배열에서 처음 8개만 추출
  const activitiesToDisplay = activities.slice(0, 8);

  // 블로그 데이터에서 break_throughs 배열을 가져오기
  const breakThroughs = blogData.break_throughs || []; // break_throughs가 없을 수 있기 때문에 기본값을 빈 배열로 설정

  const handleItemClick = (articleId) => {
    navigate(`/breakthrough/${articleId}`); // 해당 articleId로 이동
  };

  return (
    <ContentContainer>
      <LeftColumn>
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
          <SectionTitle>The Breakthroughs ({breakThroughs.length})</SectionTitle>
          {isLoggedIn && isMember && breakThroughs.length > 0 && (
            <GoToButton
              onClick={() => navigate(`/blog/${blogId}/breakthrough/write`)}
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
  gap: 3vh;
  justify-content: center;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
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
  max-height: 100vh; /* 스크롤이 필요한 최대 높이 설정 */
  overflow-y: hidden; /* 콘텐츠가 넘칠 때 스크롤 활성화 */
  overflow-x: hidden; /* 가로 스크롤 제거 */
`;

const MembersContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.1vw solid rgba(255, 255, 255, 0.7);
  border-radius: 0.8vh;
  padding: 2vh;
`;

const Member = styled.div`
  margin-bottom: 1vh;
  font-size: 2vh;
`;

const TitleContainer = styled.div`
  width: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ListContainer = styled.div`
  width: 60vw;
  position: relative;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25vw;
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
  font-size: 3.5vh;
  color: #888;
`;
